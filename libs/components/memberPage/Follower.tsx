import { useEffect, useState } from "react"
import { Avatar, Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useRouter } from "next/router"
import { MinusCircle, PlusCircle, Trash } from "phosphor-react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_FOLLOWERS } from "@/apollo/user/query"
import { socketVar, userVar } from "@/apollo/store"
import { FollowerObj } from "@/libs/types/follow/follow.object"
import { Messages, serverApi } from "@/libs/config"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { DELETE_FOLLOWER, SUBSCRIBE_MEMBER, UNSUBSCRIBE_MEMBER } from "@/apollo/user/mutation"
import { ErrorOutline } from "@mui/icons-material"
import { useGlobal } from "@/libs/hooks/useGlobal"
import { NoticeGroup } from "@/libs/enum/notice.enum"

const Follower = (props: any) => {
    const router = useRouter()
    const user = useReactiveVar(userVar)
    const socket = useReactiveVar(socketVar)
    const memberId = router.query.memberId;
    const [followers, setFollowers] = useState<FollowerObj[]>([])
    const [totalFollowers, setTotalFollowers] = useState<number>(0)
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 5,
        direction: "ASC",
        search: {
            memberId: memberId ?? user._id
        }
    })
    const { rebuild } = useGlobal()

    const { refetch: getFollowersRefetch } = useQuery(GET_FOLLOWERS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchObj },
        onCompleted: ({ getFollowerMembers }) => {
            setFollowers(getFollowerMembers.list)
            setTotalFollowers(getFollowerMembers.metaCounter[0].total)
        }
    })
    useEffect(() => {
        getFollowersRefetch({ input: searchObj }).then()
    }, [searchObj, rebuild])

    const [subscribeMember] = useMutation(SUBSCRIBE_MEMBER)
    const [deleteFollower] = useMutation(DELETE_FOLLOWER)
    const [unsubscribeMember] = useMutation(UNSUBSCRIBE_MEMBER)

    const noticeHandler = (noticeTargetId: any) => {
        const messageInput = {
            event: "message",
            data: {
                event: "notice",
                noticeGroup: NoticeGroup.FOLLOW,
                noticeTitle: `User Followed you`,
                noticeTargetId: noticeTargetId,
                noticeContent: `${user.memberNick} started follow you.`
            }
        }
        socket.send(JSON.stringify(messageInput))
    }

    const subscribeMemberHandler = async (e: any, memberId: any) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!memberId) throw new Error(Messages.error1);
            await subscribeMember({ variables: { input: memberId } });
            await sweetTopSmallSuccessAlert(Messages.success3);
            await getFollowersRefetch({ input: searchObj })
            noticeHandler(memberId)
        } catch (err: any) {
            console.log(`ERROR: subscribeMemberHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }
    const deleteFollowerHandler = async (e: any, followerId: any) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!followerId) throw new Error(Messages.error1);
            await deleteFollower({ variables: { input: followerId } });
            await sweetTopSmallSuccessAlert(Messages.success3);
            await getFollowersRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`ERROR: subscribeMemberHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }
    const unsubscribeHandler = async (e: any, followId: any) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!followId) throw new Error(Messages.error1);
            await unsubscribeMember({ variables: { input: followId } });
            await sweetTopSmallSuccessAlert(Messages.success4)
            await getFollowersRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`Error: unsubscribeHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page
        setSearchObj({ ...searchObj })
    }
    const navigatePageHandler = (e: any, id: any) => {
        if (user._id === id) {
            router.push(`/member?stage=3`)
        } else {
            router.push(`/member?stage=3&memberId=${id}`)
        }
    }
    return (
        <Stack className="follow">
            <Stack className="follow-head">
                <Box className="title">Followers</Box>
                <Box className="subtitle">We have trusted clients on your followers!</Box>
            </Stack>
            {
                followers && followers.length > 0 ? (
                    <>
                        <Stack className="follow-body">
                            <Table>
                                <TableHead>
                                    <TableRow className="table-head">
                                        <TableCell className="th-item" align="center" colSpan={2}>
                                            Member Info
                                        </TableCell>
                                        <TableCell className="th-item" align="center">
                                            Followers
                                        </TableCell>
                                        <TableCell className="th-item" align="center">
                                            Followings
                                        </TableCell>
                                        <TableCell className="th-item" align="center">
                                            Articles
                                        </TableCell>
                                        <TableCell className="th-item" align="center" colSpan={2}>
                                            Subscription
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        followers.map((follow: FollowerObj, index: number) => {
                                            const memberImage = follow.followerData?.memberImage ? `${serverApi}/${follow.followerData?.memberImage}` : "/img/profile/defaultUser.svg"
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell className={"tb-item"} align="center" colSpan={2}  >
                                                        <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
                                                            <Avatar src={memberImage} />
                                                            <Button sx={{ color: "white" }} onClick={(e: any) => navigatePageHandler(e, follow.followerData?._id)}>{follow.followerData?.memberFullName ?? follow.followerData?.memberNick}</Button>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followerData?.memberFollowers}
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followerData?.memberFollowings}
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followerData?.memberArticles}
                                                    </TableCell>
                                                    {
                                                        memberId ? (
                                                            <TableCell align="center" className={"tb-item-btn"} colSpan={2}>
                                                                {
                                                                    follow.meFollowed && follow.meFollowed[0]?.myFollowing ? (
                                                                        <Button onClick={(e: any) => unsubscribeHandler(e, follow.followerData?._id)} color="error" variant="contained" endIcon={<MinusCircle />}>
                                                                            UnFollow
                                                                        </Button>
                                                                    ) : (

                                                                        <Button onClick={(e: any) => subscribeMemberHandler(e, follow.followerData?._id)} color="success" variant="contained" endIcon={<PlusCircle />}>
                                                                            Follow
                                                                        </Button>
                                                                    )
                                                                }
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell align="center" className={"tb-item-btn"} colSpan={2}>
                                                                <Button onClick={(e) => deleteFollowerHandler(e, follow.followerData?._id)} color="warning" variant="contained" endIcon={<Trash />}>
                                                                    Delete
                                                                </Button>
                                                                {
                                                                    follow.meFollowed && follow.meFollowed[0]?.myFollowing ? null : (
                                                                        <Button onClick={(e: any) => subscribeMemberHandler(e, follow.followerData?._id)} color="success" variant="contained" endIcon={<PlusCircle />}>
                                                                            Follow Back
                                                                        </Button>
                                                                    )
                                                                }
                                                            </TableCell>
                                                        )
                                                    }
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Stack>
                        <Stack className="pagination-box">
                            <Pagination
                                page={searchObj.page}
                                count={Math.ceil(totalFollowers / searchObj.limit)}
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
                        <div>No products found!</div>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default Follower