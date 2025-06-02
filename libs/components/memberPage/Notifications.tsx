import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, IconButton, Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { socketVar, userVar } from "@/apollo/store"
import { MemberType } from "@/libs/types/member/member"
import { NoticeGroup } from "@/libs/enum/notice.enum"
import { ErrorOutline, ExpandMore } from "@mui/icons-material"
import { GET_NOTICES } from "@/apollo/user/query"
import { Notice } from "@/libs/types/notice/notice"
import { serverApi } from "@/libs/config"
import { BookOpenText, User } from "@phosphor-icons/react"
import { Bookmarks } from "phosphor-react"
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { DELETE_NOTICES } from "@/apollo/user/mutation"
import { useRouter } from "next/router"

const Notifications = () => {
    const user = useReactiveVar(userVar)
    const socket = useReactiveVar(socketVar)
    const router = useRouter()
    const [category, setCategory] = useState("")
    const [categoryCount, setCategoryCount] = useState({
        all: 0,
        product: 0,
        member: 0,
        follow: 0,
        article: 0
    })
    const [notices, setNotices] = useState<Notice[]>([])
    const [totalNotices, setTotalNotices] = useState(0)
    const [rebuild, setRebuild] = useState(new Date())
    const [searchObj, setSearchObj] = useState<any>({
        page: 1,
        limit: 5,
        search: {
        }
    })

    const { refetch: getTargetNoticesRefetch } = useQuery(GET_NOTICES, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchObj },
        onCompleted: ({ getAllNotices }) => {
            setNotices(getAllNotices.list)
            setCategoryCount(getAllNotices.categoryCount)
            setTotalNotices(getAllNotices.metaCounter[0].total ?? 0)
        }
    })

    useEffect(() => {
        getTargetNoticesRefetch({ input: searchObj }).then()
    }, [searchObj, socket, rebuild])

    const changeCategoryHandler = (category: string) => {
        setCategory(category)
        if (category) {
            searchObj.search.noticeGroup = category
        } else {
            delete searchObj.search.noticeGroup
        }
        setSearchObj({ ...searchObj })
    }

    const navigateToPageHandler = (memberId: string) => {
        const link = `member?stage=3&memberId=${memberId}`
        router.push(link, link, { scroll: false })
    }

    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page
        setSearchObj({ ...searchObj })
    }
    return (
        <Stack className="notification">
            <Stack className="notification-head">
                <Box className="title">Notifications ({totalNotices})</Box>
            </Stack>
            <Stack className="notify-body">
                <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack className="notify-category">
                        <Box className="relative">
                            <Button className={!category ? "on" : ""} onClick={(e: any) => changeCategoryHandler("")}>
                                All
                            </Button>
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-sm font-bold text-black-200 bg-blue-200 rounded-full">
                                {categoryCount.all}
                            </span>
                        </Box>
                        {
                            user.memberType === MemberType.RETAILER ? (
                                <Box className="relative">
                                    <Button
                                        className={category === NoticeGroup.PRODUCT ? "on" : ""}
                                        onClick={(e: any) => changeCategoryHandler(NoticeGroup.PRODUCT)}
                                    >
                                        Product
                                    </Button>
                                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-sm font-bold text-black-200 bg-blue-200 rounded-full">
                                        {categoryCount.product}
                                    </span>
                                </Box>
                            ) : null
                        }
                        <Box className="relative">
                            <Button
                                className={category === NoticeGroup.ARTICLE ? "on" : ""}
                                onClick={(e: any) => changeCategoryHandler(NoticeGroup.ARTICLE)}
                            >
                                Article
                            </Button>
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-sm font-bold text-black-200 bg-blue-200 rounded-full">
                                {categoryCount.article}
                            </span>
                        </Box>
                        <Box className="relative">
                            <Button
                                className={category === NoticeGroup.MEMBER ? "on" : ""}
                                onClick={(e: any) => changeCategoryHandler(NoticeGroup.MEMBER)}
                            >
                                Member
                            </Button>
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-sm font-bold text-black-200 bg-blue-200 rounded-full">
                                {categoryCount.member}
                            </span>
                        </Box>
                        <Box className="relative">
                            <Button
                                className={category === NoticeGroup.FOLLOW ? "on" : ""}
                                onClick={(e: any) => changeCategoryHandler(NoticeGroup.FOLLOW)}
                            >
                                Follow
                            </Button>
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-sm font-bold text-black-200 bg-blue-200 rounded-full">
                                {categoryCount.follow}
                            </span>
                        </Box>
                    </Stack>
                </Stack>
                {
                    notices && notices.length > 0 ? (
                        <>
                            <Stack className="notify-items">
                                {notices.map((notice: Notice, index: number) => (
                                    <Accordion className="notify-item" key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1-content"
                                        >
                                            <Stack
                                                flexDirection={"row"}
                                                gap={"10px"}
                                                alignItems={"center"}
                                            >
                                                <img src={notice.memberData.memberImage ? `${serverApi}/${notice.memberData.memberImage}` : "/img/profile/noUser.jpg"} alt="image" />
                                                <Stack className="notify-item-title">
                                                    <Stack flexDirection={"row"} gap={'5px'} alignItems={"center"}>
                                                        <User />
                                                        <Button sx={{ color: "#F18B6C", fontWeight: "bold" }} onClick={() => navigateToPageHandler(notice.memberData._id)}>
                                                            {notice.memberData.memberNick}
                                                        </Button>
                                                    </Stack>
                                                    <Stack flexDirection={"row"} gap={'5px'} alignItems={"center"}>
                                                        <Bookmarks />
                                                        <Box>
                                                            {notice.noticeTitle}
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails className="notify-item-body">{notice.noticeContent}</AccordionDetails>
                                    </Accordion>
                                ))}
                            </Stack>
                            <Stack className="pagination-box">
                                <Pagination
                                    page={searchObj.page}
                                    count={Math.ceil(totalNotices / searchObj.limit)}
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
                            style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                            gap={"10px"}
                        >
                            <ErrorOutline fontSize="large" />
                            <div>No data found!</div>
                        </Stack>
                    )
                }
            </Stack>
        </Stack>
    )
}
export default Notifications