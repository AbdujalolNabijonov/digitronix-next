import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import moment from "moment"

const Notice = () => {
    return (
        <Stack>
            <Box className="panel-title">Notice</Box>
            <Table>
                <TableHead className="panel-head">
                    <TableRow>
                        <TableCell align="center" className="th-item">
                            No
                        </TableCell>
                        <TableCell align="center" colSpan={2} className="th-item">
                            Title
                        </TableCell>
                        <TableCell align="center" className="th-item">
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="panel-body">
                    <TableRow>
                        <TableCell align="center" className="tb-item">
                            1
                        </TableCell>
                        <TableCell align="center" colSpan={2} className="tb-item">
                            I do not know
                        </TableCell>
                        <TableCell align="center" className="tb-item">
                            {moment(Date.now()).format("YYYY-MM-DD")}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    )
}

export default Notice