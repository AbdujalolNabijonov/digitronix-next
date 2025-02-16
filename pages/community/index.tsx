import { useEffect, useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Avatar, Box, Button, CircularProgress, Pagination, Stack } from "@mui/material";
import { NextPage } from "next";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { Edit, ErrorOutline } from "@mui/icons-material";
import ArticleCard from "@/libs/components/article/articleCard";
import { useRouter } from "next/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ALL_ARTICLES } from "@/apollo/user/query";
import { Article } from "@/libs/types/article/article";
import { LIKE_TARGET_ARTICLE } from "@/apollo/user/mutation";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { userVar } from "@/apollo/store";
import { Messages } from "@/libs/config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const Community: NextPage = ({ initialProps, ...props }: any) => {
    const router = useRouter()
    const device = useDeviceDetect()
    const user = useReactiveVar(userVar)
    const [value, setValue] = useState<string>("1")
    const [searchObj, setSearchObj] = useState(initialProps)
    const [articles, setArticles] = useState<Article[]>([])
    const [totalArticles, setTotalArticles] = useState<number>(0)
    const searchJson = router.query.input

    const {
        refetch: getTargetAriclesRefetch,
        loading: getTargetArticlesLoading
    } = useQuery(GET_ALL_ARTICLES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: searchObj
        },
        onCompleted: ({ getAllArticles }) => {
            setArticles(getAllArticles.list)
            setTotalArticles(getAllArticles.metaCounter[0].total)
        }
    })
    const [likeTargetArticle] = useMutation(LIKE_TARGET_ARTICLE)
    useEffect(() => {
        const search = searchJson ? JSON.parse(searchJson as string) : null
        if (router.query.input) {
            setSearchObj({ ...search })
        }
        if (search) {
            switch (search.search.articleCategory) {
                case "NEWS":
                    setValue("1")
                    break
                case "FREE":
                    setValue("2")
                    break
                case "HUMOR":
                    setValue("3")
                    break
                case "RECOMMEND":
                    setValue("4")
                    break
                default:
                    break
            }
        }
    }, [router])

    useEffect(() => {
        getTargetAriclesRefetch({ input: searchObj }).then()
    }, [searchObj])


    const handleChange = (e: any, value: string) => {
        setValue(value)
        searchObj.search.articleCategory = e.target.innerText.toUpperCase()
        setSearchObj({ ...searchObj })
        const url = `/community?input=${JSON.stringify(searchObj)}`
        router.push(url, url, { scroll: false })
    }
    const likeTargetArticleHandler = async (e: any, articleId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2)
            if (!articleId) throw new Error("Provide valid arrticleId!");
            await likeTargetArticle({ variables: { input: articleId } });
            await getTargetAriclesRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`ERROR: likeTargetArticleHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    if (device === "mobile") {
        return (
            <Box>Mobile Version is Developing</Box>
        )
    } else {
        return (
            <Stack className="community-page">
                <Stack className="container">
                    <TabContext value={value}>
                        <Stack className="tabs" direction={"row"} justifyContent={"end"}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab className="tab-item" key={"salom"} label="News" value="1" />
                                <Tab className="tab-item" label="Free" value="2" />
                                <Tab className="tab-item" label="Humor" value="3" />
                                <Tab className="tab-item" label="Recommend" value="4" />
                            </TabList>
                        </Stack>
                        <Stack className="info">
                            <Stack className="title">
                                <Box>Board Article</Box>
                                <Box>Express your opinions freely here without content restrictions</Box>
                            </Stack>
                            <Box>
                                <Button variant={"contained"} endIcon={<Edit />}>Write</Button>
                            </Box>
                        </Stack>
                        <TabPanel value={value} sx={{ height: "500px" }}>
                            {
                                false ? (<Stack justifyContent={"center"} flexDirection={"row"}><CircularProgress /></Stack>)
                                    : (articles && articles.length > 1) ? (
                                        <>
                                            <Stack className="articles">
                                                {articles.map((article: Article, index: number) => (
                                                    <ArticleCard likeTargetArticle={likeTargetArticleHandler} article={article} key={index} />
                                                ))}
                                            </Stack>
                                            <Box className="article-avb">{totalArticles} Articles Avaible</Box>
                                            <Stack className="pagination-box">
                                                <Pagination
                                                    page={searchObj.page}
                                                    count={Math.ceil(totalArticles / searchObj.limit)}
                                                    variant="outlined"
                                                    shape="rounded"
                                                    color="secondary"
                                                />
                                            </Stack>
                                        </>
                                    ) : (
                                        <Stack
                                            alignItems={"center"}
                                            style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                            gap={"10px"}
                                        >
                                            <ErrorOutline fontSize="large" />
                                            <div>No products found!</div>
                                        </Stack>
                                    )
                            }
                        </TabPanel>
                    </TabContext>
                </Stack>
            </Stack>
        )
    }
}
Community.defaultProps = {
    initialProps: {
        page: 1,
        limit: 4,
        sort: "createdAt",
        direction: "ASC",
        search: {
            articleCategory: "NEWS"
        }
    }
}

export default LayoutBasic(Community)