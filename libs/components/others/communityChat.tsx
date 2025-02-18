import { RippleBadge } from "@/scss/MaterialTheme/styled"
import { EmojiEmotions, Forum, Send } from "@mui/icons-material"
import { Button, CssVarsProvider, Input } from "@mui/joy"
import { Avatar, Box, Divider, IconButton, Menu, Stack } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import { useReactiveVar } from "@apollo/client"
import { socketVar, userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"
import { sweetErrorHandling } from "@/libs/sweetAlert"
import EmojiPicker from "emoji-picker-react"
import useDeviceDetect from "@/libs/hooks/useDeviceDetector"

const CommunityChat = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl1, setAnchorEl1] = useState(null)
    const socket = useReactiveVar(socketVar)
    const user = useReactiveVar(userVar)
    const device = useDeviceDetect()
    const [messages, setMessages] = useState<any[]>([])
    const [totalClients, setTotalClients] = useState(0)
    const [messageObj, setMessageObj] = useState({
        event: "message",
        data: ""
    })
    const toggleMenuHandler = (e: any) => {
        if (!anchorEl) {
            setAnchorEl(e.target)
        } else {
            setAnchorEl(null)
        }
    }
    const toogleAnchorHandler = (e: any) => {
        if (!anchorEl1) {
            setAnchorEl1(e.target)
        } else {
            setAnchorEl1(null)
        }
    }
    useEffect(() => {
        socket.onmessage = ({ data }) => {
            const payload = JSON.parse(data as string);
            if (payload.event === "info") {
                setTotalClients(payload.totalClients);
            }
            if (payload.event === "messages") {
                setMessages([...payload.messages])
            }
            if (payload.event === "message") {
                messages.push(payload)
                setMessages([...messages])
            }
        }
    }, [socket])

    const submitMessageHandler = async () => {
        try {
            if (!messageObj.data) throw new Error(Messages.error3)
            const jsonMsg = JSON.stringify(messageObj)
            socket.send(jsonMsg)
            messageObj.data = ""
            setMessageObj({ ...messageObj })
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="community-chat">
            <IconButton className="community-icon" onClick={toggleMenuHandler}>
                <Forum sx={{ fontSize: "35px", fill: "black" }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={toggleMenuHandler}
            >
                <Stack className="menu-item">
                    <Stack>
                        <Stack className="menu-title" justifyContent={"center"}>
                            <Box>Online Chat</Box>
                            <RippleBadge badgeContent={totalClients} />
                        </Stack>
                        <Divider sx={{ borderBottomColor: "white" }} />
                        <Stack className="menu-body">
                            {
                                messages.map((message: any, index: number) => {
                                    const imageMember = message.memberData && message.memberData.memberImage ? `${serverApi}/${message.memberData.memberImage}` : "/img/profile/noUser.jpg"
                                    if (message.event === "message" && message.memberData?._id !== user._id) {
                                        return (
                                            <Stack className="msg-left">
                                                <Avatar src={imageMember} alt="image" />
                                                <Stack className="msg-item" sx={{ borderRadius: "5px 5px 5px 0px" }}>
                                                    <Box>
                                                        {message.text}
                                                    </Box>
                                                    <Box>{moment(message.date).format("HH:MM")}</Box>
                                                </Stack>
                                            </Stack>
                                        )
                                    } else if (message.event === "message" && message.memberData?._id === user._id) {
                                        return (
                                            <Stack className="msg-left" justifyContent={"end"}>
                                                <Stack className="msg-item" sx={{ borderRadius: "5px 5px 0px 5px" }}>
                                                    <Box>
                                                        {message.text}
                                                    </Box>
                                                    <Box>{moment(message.date).format("HH:mm")}</Box>
                                                </Stack>
                                            </Stack>
                                        )
                                    } else {
                                        return (
                                            <Stack className="msg-middle" flexDirection={"row"}>
                                                <Divider sx={{ borderBottomColor: "white", flex: 1 }} />
                                                <Box>{message.memberData?.memberNick ?? "GUEST"} has connected</Box>
                                                <Divider sx={{ borderBottomColor: "white", flex: 1 }} />
                                            </Stack>
                                        )
                                    }
                                })
                            }
                        </Stack>
                        <Stack>
                            <CssVarsProvider>
                                <Input
                                    placeholder="Type in here…"
                                    autoFocus={false}
                                    sx={{ padding: "15px 10px" }}
                                    variant="soft"
                                    value={messageObj.data}
                                    onChange={(e: any) => {
                                        messageObj.data = e.target.value
                                        setMessageObj({ ...messageObj })
                                    }}
                                    endDecorator={
                                        <Button
                                            variant="soft"
                                            color="neutral"
                                            startDecorator={<Send sx={{ fill: "black", fontSize: '25px' }} />}
                                            onClick={submitMessageHandler}
                                        >
                                        </Button>
                                    }
                                    startDecorator={
                                        device === "mobile" ? null : (
                                            <Button
                                                variant="soft"
                                                color="neutral"
                                                onClick={toogleAnchorHandler}
                                                startDecorator={<EmojiEmotions sx={{ fill: "gray", fontSize: '25px' }} />}
                                            >
                                            </Button>
                                        )
                                    }
                                />
                            </CssVarsProvider>
                            {
                                device === "mobile" ? null : (
                                    <Menu
                                        anchorEl={anchorEl1}
                                        open={Boolean(anchorEl1)}
                                        onClose={toogleAnchorHandler}
                                        sx={{ height: "350px", width: "350px" }}
                                    >
                                        <EmojiPicker
                                            onEmojiClick={(emoji) => {
                                                messageObj.data += emoji.emoji
                                                setMessageObj({ ...messageObj })
                                                setAnchorEl1(null)
                                            }}
                                        />
                                    </Menu>
                                )
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Menu>
        </Stack>
    )
}
export default CommunityChat