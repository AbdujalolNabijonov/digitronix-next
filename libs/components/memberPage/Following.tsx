import { useEffect, useState } from "react"
import { Avatar, Box, Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useRouter } from "next/router"
import { MinusCircle} from "phosphor-react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { FollowingObj } from "@/libs/types/follow/follow.object"
import { GET_FOLLOWINGS } from "@/apollo/user/query"
import { userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { UNSUBSCRIBE_MEMBER } from "@/apollo/user/mutation"
import { ErrorOutline } from "@mui/icons-material"

const Following = (props: any) => {
    const router = useRouter()
    const user = useReactiveVar(userVar)
    const memberId = router.query.memberId;
    const [followings, setFollowings] = useState<FollowingObj[]>([])
    const [totalFollowings, setTotalFollowings] = useState<number>(0)
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 5,
        direction: "ASC",
        search: {
            memberId: memberId ?? user._id
        }
    })

    const { refetch: getFollowingsRefetch } = useQuery(GET_FOLLOWINGS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchObj },
        onCompleted: ({ getFollowingMembers }) => {
            setFollowings(getFollowingMembers.list)
            setTotalFollowings(getFollowingMembers.metaCounter[0].total)
        }
    })
    useEffect(() => {
        getFollowingsRefetch({ input: searchObj }).then()
    }, [searchObj])
    const [unsubscribeMember] = useMutation(UNSUBSCRIBE_MEMBER)

    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page
        setSearchObj({ ...searchObj })
    }
    const unsubscribeHandler = async (e: any, memberId: any) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!memberId) throw new Error(Messages.error1);
            await unsubscribeMember({ variables: { input: memberId } });
            await sweetTopSmallSuccessAlert(Messages.success4)
            await getFollowingsRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`Error: unsubscribeHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="follow">
            <Stack className="follow-head">
                <Box className="title">Followings</Box>
                <Box className="subtitle">We have trusted clients on your followers!</Box>
            </Stack>
            {
                followings && followings.length > 0 ? (
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
                                        followings.map((follow: FollowingObj, index: number) => {
                                            const memberImage = follow.followingData?.memberImage ? `${serverApi}/${follow.followingData.memberImage}` : "/img/profile/defaultUser.svg";
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell className={"tb-item"} align="center" colSpan={2}  >
                                                        <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
                                                            <Avatar src={memberImage} />
                                                            <Box>{follow.followingData?.memberFullName ?? follow.followingData?.memberNick}</Box>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followingData?.memberFollowers}
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followingData?.memberFollowings}
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item"} >
                                                        {follow.followingData?.memberArticles}
                                                    </TableCell>
                                                    <TableCell align="center" className={"tb-item-btn"} colSpan={2}>
                                                        <Button onClick={(e: any) => unsubscribeHandler(e, follow.followingData?._id)} color="error" variant="contained" endIcon={<MinusCircle />}>
                                                            Unfollow
                                                        </Button>
                                                    </TableCell>
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
                                count={Math.ceil(totalFollowings / searchObj.limit)}
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
        </Stack >
    )
}

export default Following