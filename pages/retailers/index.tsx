import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField
} from "@mui/material";
import { SearchRetailer } from "@/libs/types/retailer/retailer";
import { ErrorOutline, RemoveRedEyeRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_MEMBERS } from "@/apollo/user/query";
import { Member, MemberType } from "@/libs/types/member/member";
import { Messages, serverApi } from "@/libs/config";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { socketVar, userVar } from "@/apollo/store";
import { LIKE_TARGET_MEMBER } from "@/apollo/user/mutation";
import { NoticeGroup } from "@/libs/enum/notice.enum";

const Retailers: NextPage = (props: any) => {
    const [totalRetailers, setTotalRetailer] = useState<number>(10)
    const [retailers, setRetailers] = useState<Member[]>([])
    const router = useRouter()
    const user = useReactiveVar(userVar)
    const socket = useReactiveVar(socketVar)
    const [searchObj, setSearchObj] = useState<SearchRetailer>({
        page: 1,
        limit: 8,
        sort: "createdAt",
        search: {
            memberType: MemberType.RETAILER,
        }
    })

    const { refetch: getMembersRefetch } = useQuery(GET_MEMBERS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchObj },
        onCompleted: ({ getMembers }) => {
            setRetailers(getMembers.list ?? [])
            setTotalRetailer(getMembers.metaCounter[0].total ?? 0)
        }
    })
    const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER)
    useEffect(() => {
        if (!router.query.input) {
            const url = `/retailers?input=${JSON.stringify(searchObj)}`
            router.push(url, url, { scroll: false })
        }
    }, [])
    //LifeCircle
    useEffect(() => {
        if (router.query.input) {
            const inputObj = JSON.parse(router.query.input as string)
            setSearchObj(inputObj)
            getMembersRefetch({ input: inputObj }).then()
        }
    }, [router])

    const paginationHandler = useCallback(
        async (e: any, page: number) => {
            try {
                searchObj.page = page
                const url = `/retailers/?input=${JSON.stringify(searchObj)}`;
                await router.push(url, url, { scroll: false })
            } catch (err: any) {
                console.log(`Error: paginationHandler: ${err.message}`)
            }
        }, [searchObj]
    )

    const handleSelectSort = useCallback(
        async (e: any) => {
            const value = e.target.value;
            try {
                searchObj.sort = value;
                const url = `/retailers/?input=${JSON.stringify(searchObj)}`;
                await router.push(url, url, { scroll: false })
            } catch (err: any) {
                console.log(`Error: handleSelectSort: ${err.message}`)
            }
        }, [searchObj])

    const textSearchHandler = useCallback(
        async (e: any) => {
            const value = e.target.value
            try {
                searchObj.search.text = value;
                if (searchObj.search.text === "") delete searchObj.search.text
                const url = `/retailers/?input=${JSON.stringify(searchObj)}`;
                await router.push(url, url, { scroll: false })
            } catch (err: any) {
                console.log(`Error: textSearchHandler: ${err.message}`)
            }
        }, [searchObj])

    const likeTargetHandler = async (e: any, memberId: string) => {
        try {
            e.stopPropagation()
            if (user._id === memberId) throw new Error(Messages.error7)
            if (!user._id) throw new Error(Messages.error2);
            if (!memberId) throw new Error(Messages.error1);
            await likeTargetMember({ variables: { input: memberId } });
            await getMembersRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`ERROR: likeTargetHandler: ${err}`);
            await sweetErrorHandling(err)
        }
    }
    const noticeHandler = (noticeTargetId: any) => {
        const messageInput = {
            event: "message",
            data: {
                event: "notice",
                noticeGroup: NoticeGroup.MEMBER,
                noticeTitle: `Member Liked`,
                noticeTargetId: noticeTargetId,
                noticeContent: `${user.memberNick} liked You`
            }
        }
        socket.send(JSON.stringify(messageInput))
    }
    return (
        <Box className="container">
            <Stack className="retailer-page">
                <Stack className={"retailer-filter"}>
                    <Stack className={"retailer-sort"}>
                        <Box>Sort by</Box>
                        <Select value={searchObj.sort} onChange={handleSelectSort}>
                            <MenuItem value={"createdAt"}>Recent</MenuItem>
                            <MenuItem value={"memberLikes"}>Famous</MenuItem>
                            <MenuItem value={"memberViews"}>Most Viewed</MenuItem>
                        </Select>
                    </Stack>
                    <Box className="retailer-search">
                        <TextField
                            id="outlined-basic"
                            placeholder="Search for a retailer"
                            variant="outlined"
                            onChange={textSearchHandler}
                        />
                    </Box>
                </Stack>
                {retailers && retailers.length > 0 ? (
                    <>
                        <Stack className={"retailers"}>
                            {
                                retailers.map((member: Member, index: number) => {
                                    const imageUrl = member.memberImage ? `${serverApi}/${member.memberImage}` : "/img/profile/noUser.jpg"
                                    return (
                                        <Stack className="retailer-card" key={index} onClick={() => {
                                            const url = `/retailers/detail?id=${member._id}`
                                            router.push(url, url, { scroll: false })
                                        }}>
                                            <Box className={"card-head"}>
                                                <img src={imageUrl} alt="" />
                                                <Stack className={"card-head-items"}>
                                                    <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                                        <IconButton disableRipple onClick={(e) => { e.stopPropagation() }}>
                                                            <RemoveRedEyeRounded />
                                                        </IconButton>
                                                        <Box>{member.memberViews}</Box>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                                        <IconButton onClick={(e) => { 
                                                            likeTargetHandler(e, member._id) 
                                                            if(!member.meLiked[0]?.myFavorite){
                                                                noticeHandler(member._id)
                                                            }
                                                            }}>
                                                            <ThumbUpAltRounded sx={member.meLiked && member.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                                                        </IconButton>
                                                        <Box>{member.memberLikes}</Box>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                            <Stack className={"card-body"}>
                                                <Box className="card-title">{member.memberFullName ?? member.memberNick}</Box>
                                                <Box className="card-subtitle">{member.memberEmail ?? "No email provided"}</Box>
                                                <Stack direction={"row"} className="card-info">
                                                    <Stack className="card-info-item">
                                                        <Box>{member.memberProducts}</Box>
                                                        <Box>Products</Box>
                                                    </Stack>
                                                    <Stack className="card-info-item">
                                                        <Box>{member.memberFollowings}</Box>
                                                        <Box>Followings</Box>
                                                    </Stack>
                                                    <Stack className="card-info-item">
                                                        <Box>{member.memberFollowers}</Box>
                                                        <Box>Followers</Box>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <Stack className={"card-footer"} direction={"row"}>
                                                <Button variant="outlined">
                                                    View
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                        <Box sx={{ textAlign: "center", color: "white" }}>Total {totalRetailers} retailers avaible</Box>
                        <Stack className="pagination-box">
                            <Pagination
                                page={searchObj.page}
                                count={Math.ceil(totalRetailers / searchObj.limit)}
                                variant="outlined"
                                onChange={paginationHandler}
                                shape="rounded"
                                color="secondary"
                            />
                        </Stack>
                    </>
                ) : (
                    <Stack
                        alignSelf={"center"}
                        gap={"10px"}
                    >
                        <ErrorOutline fontSize="large" />
                        <div>No products found!</div>
                    </Stack>
                )
                }
            </Stack>
        </Box>
    )
}

export default LayoutBasic(Retailers)
