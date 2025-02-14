import { useEffect, useState } from "react"
import { Avatar, Box, Button, Divider, Stack } from "@mui/material"
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { socketVar, userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"
import { BookBookmark, Crosshair, Phone, User, UserCirclePlus } from "phosphor-react"
import { Member, MemberType } from "@/libs/types/member/member"
import { Devices, UserCircleCheck } from "@phosphor-icons/react"
import { useRouter } from "next/router"
import { GET_MEMBER } from "@/apollo/user/query"
import { SUBSCRIBE_MEMBER, UNSUBSCRIBE_MEMBER } from "@/apollo/user/mutation"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { useGlobal } from "@/libs/hooks/useGlobal"
import { NoticeGroup } from "@/libs/enum/notice.enum"

const OtherPanel = (props: any) => {
    const { navigateSelectHandler } = props
    const router = useRouter()
    const user = useReactiveVar(userVar);
    const stage = router.query.stage
    const socket = useReactiveVar(socketVar)
    const memberId = router.query.memberId
    const { setRebuild } = useGlobal()
    const [member, setMember] = useState<Member | null>(null)

    const { refetch: getMemberRefetch } = useQuery(GET_MEMBER, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !memberId,
        variables: { input: memberId },
        onCompleted: ({ getMember }) => {
            setMember(getMember)
        }
    })
    const [subscribeMember] = useMutation(SUBSCRIBE_MEMBER)
    const [unsubscribeMember] = useMutation(UNSUBSCRIBE_MEMBER)
    useEffect(() => {
        if (router.query.memberId) {
            getMemberRefetch({ input: memberId })
        } else {
            getMemberRefetch({ input: user._id })
        }
    }, [router])

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

    const subscribeMemberHandler = async () => {
        try {
            if (!user._id) throw new Error(Messages.error2)
            await subscribeMember({ variables: { input: memberId } })
            noticeHandler(memberId)
            await sweetTopSmallSuccessAlert("Subscribed successfully!")
            await getMemberRefetch({ input: memberId })
            setRebuild(new Date())
        } catch (err: any) {
            console.log(`Error: subscribeMemberHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const unsubscribeMemberHandler = async () => {
        try {
            if (!user._id) throw new Error(Messages.error2)
            await unsubscribeMember({ variables: { input: memberId } })
            await sweetTopSmallSuccessAlert("Subscribed successfully!")
            await getMemberRefetch({ input: memberId })
            setRebuild(new Date())
        } catch (err: any) {
            console.log(`Error: subscribeMemberHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="account-nav">
            <Stack className="account-info">
                <Avatar sx={{ width: "70px", height: "70px" }} src={member?.memberImage ? `${serverApi}/${member.memberImage}` : "img/profile/noUser.jpg"} />
                <Stack>
                    <Stack className="account-item">
                        <User />
                        <Box>{member?.memberFullName || member?.memberNick}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Phone />
                        <Box>{member?.memberPhone}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Crosshair />
                        <Box className="account-type">{member?.memberType}</Box>
                    </Stack>
                </Stack>
            </Stack>
            {
                member?.meFollowed && member.meFollowed[0]?.myFollowing ? (
                    <Button className="follow-btn" onClick={unsubscribeMemberHandler}>
                        Unfollow
                    </Button>
                ) : (
                    <Button className="follow-btn" onClick={subscribeMemberHandler}>Follow</Button>
                )
            }
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Manage Listing</Box>
                <Stack className="tab-list">
                    {
                        member?.memberType === MemberType.RETAILER ? (
                            <Button
                                startIcon={<Devices />}
                                className={stage === "9" ? "tab-list-item on" : "tab-list-item off"}
                                onClick={(e: any) => navigateSelectHandler(e, '9')}
                            >
                                Products
                            </Button>
                        ) : null
                    }
                    <Button
                        startIcon={<UserCircleCheck />}
                        className={stage === "3" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '3')}
                    >
                        Followers
                    </Button>
                    <Button
                        startIcon={<UserCirclePlus />}
                        onClick={(e: any) => navigateSelectHandler(e, '4')}
                        className={stage === "4" ? "tab-list-item on" : "tab-list-item off"}
                    >
                        Followings
                    </Button>
                </Stack>
            </Stack>
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Community</Box>
                <Stack className="tab-list">
                    <Button
                        startIcon={<BookBookmark />}
                        className={stage === "5" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '5')}
                    >
                        Articles
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default OtherPanel