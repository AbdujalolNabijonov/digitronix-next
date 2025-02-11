import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { Box, Button, Modal, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { NoticeList } from "@/libs/components/admin/cs/noticeList"
import { Add, ErrorOutline } from "@mui/icons-material"
import { CssVarsProvider, FormLabel, Input, FormControl as JoyForm } from "@mui/joy"
import { FilePlus, X } from "phosphor-react"
import { Notice } from "@/libs/types/notice/notice"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_NOTICES } from "@/apollo/user/query"
import { socketVar } from "@/apollo/store"
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { Messages } from "@/libs/config"
import { DELETE_NOTICE } from "@/apollo/user/mutation"

const NoticeAdmin: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [toggleModal, setToggleModal] = useState(false)
    const [noticeInquiry, setNoticeInquiry] = useState(initialProps)
    const [notices, setNotices] = useState<Notice[]>([])
    const [totalNotices, setTotalNotices] = useState<number>(0)
    const [rebuild, setRebuild] = useState(new Date())
    const [noticeMsg, setNoticeMsg] = useState({
        event: "message",
        data: {
            event: "notice",
            noticeContent: ""
        }
    })
    const socket = useReactiveVar(socketVar)

    const { refetch: getNoticesRefetch } = useQuery(GET_NOTICES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: noticeInquiry },
        onCompleted: ({ getAllNotices }) => {
            setNotices(getAllNotices.list)
            setTotalNotices(getAllNotices.metaCounter[0].total)
        }
    })
    const [deleteNotice] = useMutation(DELETE_NOTICE)

    useEffect(() => {
        getNoticesRefetch({ input: noticeInquiry })
    }, [rebuild])

    //Handlers
    const submitDataHandler = async () => {
        try {
            if (!noticeMsg.data.noticeContent) throw new Error(Messages.error1);
            socket.send(JSON.stringify(noticeMsg))
            await sweetTopSmallSuccessAlert("Sucecessfully sent!")
            setToggleModal(false)
            setRebuild(new Date())
        } catch (err: any) {
            console.log(`ERROR: submitDataHandler, ${err.message}`)
            setToggleModal(false)
            await sweetErrorHandling(err)
        }
    }

    const deleteTargetNoticeHandler = async (targetId: string) => {
        try {
            if (!targetId) throw new Error(Messages.error1);
            const confirm = await sweetConfirmAlert("Do you want to delete notice?")
            if (confirm) {
                await deleteNotice({ variables: { input: targetId } })
                await sweetTopSmallSuccessAlert("Sucecessfully deleted!")
                setRebuild(new Date())
            }
        } catch (err: any) {
            console.log(`ERROR: submitDataHandler, ${err.message}`)
            setToggleModal(false)
            await sweetErrorHandling(err)
        }
    }


    const toggleModalHandler = () => {
        setToggleModal(!toggleModal)
    }
    const changePageHandler = async (event: unknown, newPage: number) => {
        noticeInquiry.page = newPage + 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setNoticeInquiry({ ...noticeInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        noticeInquiry.limit = parseInt(event.target.value, 10);
        noticeInquiry.page = 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setNoticeInquiry({ ...noticeInquiry });
    };

    const handleNoticeHandler = (e: any) => {
        noticeMsg.data.noticeContent = e.target.value;
        setNoticeMsg({ ...noticeMsg })
    }

    return (
        <>
            <Stack className="admin-user" >
                <Box className="title">
                    NOTICE
                </Box>
                <>
                    <Button
                        sx={{ backgroundColor: "gray", width: "150px", marginTop: "30px", fontWeight: "bold", color: "white" }}
                        onClick={toggleModalHandler}
                    >
                        <div>ADD</div>
                        <Add />
                    </Button>
                    <Modal
                        open={toggleModal}
                        onClose={toggleModalHandler}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Stack className="faq-modal">
                            <Stack className="faq-main">
                                <Box className="title">ADD NOTICE</Box>
                                <CssVarsProvider>
                                    <Stack>
                                        <JoyForm>
                                            <FormLabel className="add-label">Text</FormLabel>
                                            <textarea rows={10} onChange={handleNoticeHandler}></textarea>
                                        </JoyForm>
                                    </Stack>
                                </CssVarsProvider>
                                <Stack flexDirection={"row"} gap={"30px"}>
                                    <Button endIcon={< X />} variant="contained" color="info" onClick={toggleModalHandler}>Exit</Button>
                                    <Button endIcon={<FilePlus />} variant="contained" color="warning" onClick={submitDataHandler}>Add</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Modal>
                </>
                <Stack>
                    <Box className="table-list">
                        {
                            notices && notices.length > 0 ? (
                                <>
                                    <NoticeList notices={notices} deleteTargetNoticeHandler={deleteTargetNoticeHandler} />
                                    <TablePagination
                                        style={{ color: "white" }}
                                        rowsPerPageOptions={[10, 20, 40, 60]}
                                        component="div"
                                        count={totalNotices}
                                        rowsPerPage={noticeInquiry?.limit}
                                        page={noticeInquiry?.page - 1}
                                        onPageChange={changePageHandler}
                                        onRowsPerPageChange={changeRowsPerPageHandler}
                                    />
                                </>
                            ) : (
                                <Stack
                                    alignItems={"center"}
                                    style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                    gap={"10px"}
                                >
                                    <ErrorOutline fontSize="large" />
                                    <div>No notices found!</div>
                                </Stack>
                            )
                        }
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

NoticeAdmin.defaultProps = {
    initialProps: {
        page: 1,
        limit: 10,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(NoticeAdmin)