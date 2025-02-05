import { useState,useEffect } from "react"
import { Box, Pagination, Stack } from "@mui/material"
import ArticleCard from "../article/articleCard";
import { Article } from "@/libs/types/article/article";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ALL_ARTICLES } from "@/apollo/user/query";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { Messages } from "@/libs/config";
import { LIKE_TARGET_ARTICLE } from "@/apollo/user/mutation";

const Articles = (props: any) => {
    const user = useReactiveVar(userVar)
    const router = useRouter()
    const memberId = router.query.memberId
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 6,
        sort: "createdAt",
        search: {
            memberId: memberId || user._id
        }
    })
    const [totalArticles, setTotalArticles] = useState<number>(0);
    const [articles, setArticles] = useState<Article[]>([])

    const { refetch: getTargetArticlesRefetch } = useQuery(GET_ALL_ARTICLES, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        variables: {
            input: searchObj
        },
        onCompleted: ({ getAllArticles }) => {
            setArticles(getAllArticles.list)
            setTotalArticles(getAllArticles.metaCounter[0].total)
        }
    })

    useEffect(() => {
        getTargetArticlesRefetch({ input: searchObj })
    }, [searchObj])

    const [likeTargetArticle] = useMutation(LIKE_TARGET_ARTICLE)
    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page;
        setSearchObj({ ...searchObj })
    }
    const likeTargetArticleHandler = async (e: any, articleId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2)
            if (!articleId) throw new Error(Messages.error1);
            await likeTargetArticle({ variables: { input: articleId } })
            await getTargetArticlesRefetch({ input: searchObj });
        } catch (err: any) {
            console.log(`ERROR: likeTargetArticleHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="article">
            <Stack className="article-head">
                <Box className="title">Articles</Box>
                <Box className="subtitle">More Article you have more friends you can get!</Box>
            </Stack>
            {
                articles && articles.length > 0 ? (
                    <>
                        <Stack className="article-body">
                            {
                                articles.map((article: Article) => (
                                    <ArticleCard article={article} likeTargetArticle={likeTargetArticleHandler} />
                                ))
                            }
                        </Stack>
                        <Stack className="pagination-box">
                            <Pagination
                                page={searchObj.page}
                                count={Math.ceil(totalArticles / searchObj.limit)}
                                onChange={handlePaginationChange}
                                variant="outlined"
                                shape="rounded"
                                color="secondary"
                            />
                        </Stack>
                    </>
                ) : (
                    <Stack
                        alignItems={"center"}
                        style={{ width: "100%", margin: "30px 0", fontSize: "24px", color: "white" }}
                        gap={"10px"}
                    >
                        <ErrorOutline fontSize="large" />
                        <div>No products found!</div>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default Articles