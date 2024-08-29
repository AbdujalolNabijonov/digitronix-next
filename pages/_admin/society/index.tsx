import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { Box, MenuItem, Select, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"
import { CommunityList } from "@/libs/components/admin/community/communityList"
import { ArticleInquiry } from "@/libs/types/article/article.input"
import { ArticleCategory, ArticleStatus } from "@/libs/enum/article.enum"
import { useQuery, useMutation } from "@apollo/client"
import { GET_ALL_ARTICLES_BY_ADMIN } from "@/apollo/admin/query"
import { Article } from "@/libs/types/article/article"
import { REMOVE_ARTICLE_BY_ADMIN, UPDATE_ARTICLE_BY_ADMIN } from "@/apollo/admin/mutation"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"


const Community: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [articlesInquiry, setArticlesInquiry] = useState<ArticleInquiry>(initialProps)
    const [value, setValue] = useState<string>("ALL")
    const [articles, setArticles] = useState<Article[]>([])
    const [totalArticles, setTotalArticles] = useState<number>(0)

    //Apollo Request
    const {
        loading: getAllArticlesByAdminLoading,
        data: getAllArticlesByAdminData,
        error: getAllArticlesByAdminError,
        refetch: getAllArticlesByAdminRefetch
    } = useQuery(GET_ALL_ARTICLES_BY_ADMIN, {
        fetchPolicy: "cache-and-network",
        variables: { input: articlesInquiry },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: any) => {
            setArticles(data.getAllArticlesByAdmin.list)
            setTotalArticles(data.getAllArticlesByAdmin.metaCounter[0].total ?? 0)
        }
    })

    const [updateArticleByAdmin] = useMutation(UPDATE_ARTICLE_BY_ADMIN)
    const [removeArticleByAdmin] = useMutation(REMOVE_ARTICLE_BY_ADMIN)

    //Handlers
    const changePageHandler = async (event: unknown, newPage: number) => {
        articlesInquiry.page = newPage + 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setArticlesInquiry({ ...articlesInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        articlesInquiry.limit = parseInt(event.target.value, 10);
        articlesInquiry.page = 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setArticlesInquiry({ ...articlesInquiry });
    };
    const menuIconClickHandler = (e: any, index: number) => {
        const tempAnchor = anchorEl.slice();
        tempAnchor[index] = e.currentTarget;
        setAnchorEl(tempAnchor);
    };

    const menuIconCloseHandler = () => {
        setAnchorEl([]);
    };

    const handleSearchStatus = async (status: any) => {
        if (status !== "ALL") {
            setArticlesInquiry({ ...articlesInquiry, search: { ...articlesInquiry.search, articleStatus: status } })
        } else {
            delete articlesInquiry.search.articleStatus;
            setArticlesInquiry({ ...articlesInquiry })
        }
        await getAllArticlesByAdminRefetch(articlesInquiry)
    }

    async function handleSearchCategory(category: string) {
        if (category !== "ALL") {
            setArticlesInquiry({ ...articlesInquiry, search: { ...articlesInquiry.search, articleCategory: category } })
        } else {
            delete articlesInquiry.search.articleCategory;
            setArticlesInquiry({ ...articlesInquiry })
        }
        await getAllArticlesByAdminRefetch(articlesInquiry)
        setValue(category)
    }

    const updateArticleHandler = async (updateData: any) => {
        try {
            await updateArticleByAdmin({ variables: { input: updateData } });
            menuIconCloseHandler();
            await getAllArticlesByAdminRefetch({ input: articlesInquiry })
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

    const removeArticleHandler = async (articleId: string) => {
        try {
            await removeArticleByAdmin({ variables: { input: articleId } });
            await getAllArticlesByAdminRefetch(articlesInquiry)
            await sweetTopSmallSuccessAlert("Successfully deleted!")
        } catch (err) {
            sweetErrorHandling(err).then();
        }
    }
    return (
        <>
            <Stack className="admin-user" >
                <Box className="title">
                    Community
                </Box>
                <Stack>
                    <Stack className="search-panel">
                        <Stack className="status" direction={"row"} gap={"10px"}>
                            <Box className={!articlesInquiry?.search?.articleStatus ? 'on' : ''} onClick={() => handleSearchStatus("ALL")}>ALL</Box>
                            <Box className={articlesInquiry?.search?.articleStatus === ArticleStatus.ACTIVE ? 'on' : ''} onClick={() => handleSearchStatus(ArticleStatus.ACTIVE)}>Active</Box>
                            <Box className={articlesInquiry?.search?.articleStatus === ArticleStatus.DELETE ? 'on' : ''} onClick={() => handleSearchStatus(ArticleStatus.DELETE)}>Delete</Box>
                        </Stack>
                        <Stack className="search-area" direction={"row"} alignItems={"center"} justifyContent={"end"}>
                            <Select sx={{ width: '160px', ml: '20px' }} value={value}>
                                <MenuItem value={"ALL"} onClick={() => handleSearchCategory('ALL')}>
                                    All
                                </MenuItem>
                                {
                                    Object.values(ArticleCategory).map((category: string) => (
                                        <MenuItem value={category} onClick={() => handleSearchCategory(category)}>
                                            {category}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <Box className="table-list">
                        <CommunityList
                            articles={articles}
                            anchorEl={anchorEl}
                            menuIconClickHandler={menuIconClickHandler}
                            menuIconCloseHandler={menuIconCloseHandler}
                            updateArticleHandler={updateArticleHandler}
                            removeArticleHandler={removeArticleHandler}
                        />
                        <TablePagination
                            style={{ color: "white" }}
                            rowsPerPageOptions={[10, 20, 40, 60]}
                            component="div"
                            count={totalArticles}
                            rowsPerPage={articlesInquiry?.limit}
                            page={articlesInquiry?.page - 1}
                            onPageChange={changePageHandler}
                            onRowsPerPageChange={changeRowsPerPageHandler}
                        />
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}


Community.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(Community)