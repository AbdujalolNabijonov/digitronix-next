import SearchPanel from "@/libs/components/admin/searchPanel"
import { MemberPanelList } from "@/libs/components/admin/users/membersPanelList"
import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { Box, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { getJwtToken } from "@/libs/auth"
import { useRouter } from "next/router"

const AdminUser: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [membersInquiry, setMembersInquiry] = useState<MembersInquiry>(initialProps)
    const members: any[] = []
    const membersTotal = 4;
    const router = useRouter();

    //LifeCircle
    useEffect(() => {
        const jwtToken = getJwtToken();
        if (!jwtToken) {
            router.push("/")
        }
    }, [])
    //Handlers
    const changePageHandler = async (event: unknown, newPage: number) => {
        membersInquiry.page = newPage + 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setMembersInquiry({ ...membersInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        membersInquiry.limit = parseInt(event.target.value, 10);
        membersInquiry.page = 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setMembersInquiry({ ...membersInquiry });
    };
    const menuIconClickHandler = (e: any, index: number) => {
        const tempAnchor = anchorEl.slice();
        tempAnchor[index] = e.currentTarget;
        setAnchorEl(tempAnchor);
    };

    const menuIconCloseHandler = () => {
        setAnchorEl([]);
    };

    const updateMemberHandler = async (updateData: any) => {
        // try {
        // 	await updateMemberByAdmin({ variables: { input: updateData } });
        // 	menuIconCloseHandler();
        // 	await getAllMembersReftch({ input: membersInquiry })
        // } catch (err: any) {
        // 	sweetErrorHandling(err).then();
        // }
    };

    return <>
        <Stack className="admin-user" >
            <Box className="title">
                Users
            </Box>
            <Stack>
                <SearchPanel />
                <Box className="table-list">
                    <MemberPanelList
                        members={members}
                        anchorEl={anchorEl}
                        menuIconClickHandler={menuIconClickHandler}
                        menuIconCloseHandler={menuIconCloseHandler}
                        updateMemberHandler={updateMemberHandler}
                    />
                    <TablePagination
                        style={{ color: "white" }}
                        rowsPerPageOptions={[10, 20, 40, 60]}
                        component="div"
                        count={membersTotal}
                        rowsPerPage={membersInquiry?.limit}
                        page={membersInquiry?.page - 1}
                        onPageChange={changePageHandler}
                        onRowsPerPageChange={changeRowsPerPageHandler}
                    />
                </Box>
            </Stack>
        </Stack>
    </>
}

AdminUser.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(AdminUser)