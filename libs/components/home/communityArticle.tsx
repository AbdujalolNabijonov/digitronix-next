import { Box, Stack } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"
import { useQuery } from '@apollo/client'
import { GET_ALL_ARTICLES } from "@/apollo/user/query"
import { ArticleCategory } from "@/libs/enum/article.enum"
import { useRouter } from "next/router"
import { ArticleLoop } from "./ArticleMrqueen"


const CommunityArticle: NextPage = ({ initialProps, ...props }: any) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [humarArticles, setHumarArticles] = useState([]);
    const [freeArticles, setFreeArticles] = useState([]);
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
    const { } = useQuery(GET_ALL_ARTICLES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                ...initialProps,
                search: { articleCategory: ArticleCategory.FREE }
            }
        },
        onCompleted: ({ getAllArticles }) => {
            setFreeArticles(getAllArticles.list)
        }
    })
    const navigatetoPageHandler = (articleId: string, articleCategory: string) => {
        router.push(`/community/detail?id=${articleId}&category=${articleCategory}`)
    }
    return (
        <>
            <Stack className="community-article">
                <Box className="container">
                    <div className="title text-white">
                        Community Article
                    </div>
                </Box>
                <ArticleLoop
                    navigatetoPageHandler={navigatetoPageHandler}
                    newsArticles={newsArticles}
                    humarArticles={humarArticles}
                    freeArticles={freeArticles}
                />
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