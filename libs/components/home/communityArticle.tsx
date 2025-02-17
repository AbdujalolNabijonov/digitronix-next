import { Box, Stack } from "@mui/material"
import { NextPage } from "next"
import VerticalCard from "./verticalCard"
import HorizontalCard from "./horizontalCard"
import { useState } from "react"
import { useQuery } from '@apollo/client'
import { GET_ALL_ARTICLES } from "@/apollo/user/query"
import { ArticleCategory } from "@/libs/enum/article.enum"
import { Article } from "@/libs/types/article/article"
import { useRouter } from "next/router"


const CommunityArticle: NextPage = ({ initialProps, ...props }: any) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [humarArticles, setHumarArticles] = useState([]);
    const router = useRouter()

    const { } = useQuery(GET_ALL_ARTICLES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                ...initialProps,
                search: { articleCategory: ArticleCategory.HUMOR }
            }
        },
        onCompleted: ({ getAllArticles }) => {
            setHumarArticles(getAllArticles.list)
        }
    })
    const { } = useQuery(GET_ALL_ARTICLES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                ...initialProps,
                search: { articleCategory: ArticleCategory.NEWS }
            }
        },
        onCompleted: ({ getAllArticles }) => {
            setNewsArticles(getAllArticles.list)
        }
    })
    const navigatetoPageHandler = (articleId: string, articleCategory: string) => {
        router.push(`/community/detail?id=${articleId}&category=${articleCategory}`)
    }
    return (
        <>
            <Stack className="community-article">
                <Box className="container">
                    <div className="title">
                        Community Article
                    </div>
                    <Stack direction={"row"} className="cards">
                        <Stack direction={"row"} gap="20px">
                            {
                                newsArticles.map((article: Article, index: number) => (
                                    <VerticalCard key={index} article={article} navigatetoPageHandler={navigatetoPageHandler} />
                                ))
                            }
                        </Stack>
                        <Stack gap={"10px"}>
                            {
                                humarArticles.map((article: Article, index: number) => (
                                    <HorizontalCard key={index} article={article} navigatetoPageHandler={navigatetoPageHandler} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

CommunityArticle.defaultProps = {
    initialProps: {
        page: 1,
        limit: 2,
        sort: 'createdAt',
        search: {}
    }
}

export default CommunityArticle