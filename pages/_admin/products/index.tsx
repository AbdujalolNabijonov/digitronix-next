import { ProductList } from "@/libs/components/admin/products/productList"
import SearchPanel from "@/libs/components/admin/products/searchPanel"
import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { Box, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const Products: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [membersInquiry, setMembersInquiry] = useState<MembersInquiry>(initialProps)
    const members: any[] = []
    const membersTotal = 4
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
    return (
        <>
            <Stack className="admin-user" >
                <Box className="title">
                    Products
                </Box>
                <Stack>
                    <SearchPanel />
                    <Box className="table-list">
                        <ProductList
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
    )
}

Products.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(Products)