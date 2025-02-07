import { useState } from "react"
import { Avatar, Box, Button, Divider, Stack } from "@mui/material"
import { useQuery, useReactiveVar } from '@apollo/client'
import { userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"
import { Binoculars, BookBookmark, Crosshair, Heart, Phone, SignOut, User, UserCircleGear, UserCirclePlus } from "phosphor-react"
import { MemberType } from "@/libs/types/member/member"
import { BookOpenText, Devices, PlusSquare, UserCircleCheck } from "@phosphor-icons/react"
import { useRouter } from "next/router"
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert"
import { logOut } from "@/libs/auth"
import { GET_MEMBER } from "@/apollo/user/query"

const OtherPanel = (props: any) => {
    const { navigateSelectHandler } = props
    const router = useRouter()
    const user = useReactiveVar(userVar);
    const stage = router.query.stage
    const memberId = router.query.memberId
    const [member, setMember] = useState(user)

    const { } = useQuery(GET_MEMBER, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !memberId,
        variables: { input: memberId },
        onCompleted: ({ getMember }) => {
            setMember(getMember)
        }
    })
    return (
        <Stack className="account-nav">
            <Stack className="account-info">
                <Avatar sx={{ width: "70px", height: "70px" }} src={member.memberImage ? `${serverApi}/${member.memberImage}` : "img/profile/noUser.jpg"} />
                <Stack>
                    <Stack className="account-item">
                        <User />
                        <Box>{member.memberFullName || member.memberNick}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Phone />
                        <Box>{member.memberPhone}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Crosshair />
                        <Box className="account-type">{member.memberType}</Box>
                    </Stack>
                </Stack>
            </Stack>
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Manage Listing</Box>
                <Stack className="tab-list">
                    {
                        member.memberType === MemberType.RETAILER ? (
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