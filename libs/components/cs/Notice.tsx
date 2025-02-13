import { Notice as NoticeObj } from "@/libs/types/notice/notice"
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_NOTICES } from "@/apollo/user/query"
import { ErrorOutline } from "@mui/icons-material"

const Notice = () => {
    const [notices, setNotices] = useState<NoticeObj[]>([])
    const { } = useQuery(GET_NOTICES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                page: 1,
                limit: 10,
                search: {
                }
            }
        },
        onCompleted: ({ getAllNotices }) => {
            setNotices(getAllNotices.list)
        }
    })
    return (
        <Stack>
            <Box className="panel-title">Notice</Box>
            <Table>
                <TableHead className="panel-head">
                    <TableRow>
                        <TableCell align="center" className="th-item">
                            No
                        </TableCell>
                        <TableCell align="center" className="th-item">
                            Title
                        </TableCell>
                        <TableCell align="center" colSpan={2} className="th-item">
                            CONTENT
                        </TableCell>
                        <TableCell align="center" className="th-item">
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="panel-body">
                    {
                        notices && notices.length > 0 ? notices.map((notice: NoticeObj, index: number) => (
                            <TableRow key={index}>
                                <TableCell align="center" className="tb-item">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center" className="tb-item">
                                    {notice.noticeTitle}
                                </TableCell>
                                <TableCell align="center" colSpan={2} className="tb-item">
                                    {notice.noticeContent}
                                </TableCell>
                                <TableCell align="center" className="tb-item">
                                    {moment(notice.createdAt).format("DD MMMM, YYYY")}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Stack
                                        alignItems={"center"}
                                        style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                        gap={"10px"}
                                    >
                                        <ErrorOutline fontSize="large" />
                                        <div>No questions found!</div>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </Stack>
    )
}

export default Notice