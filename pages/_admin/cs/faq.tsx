import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { Box, Button, MenuItem, OutlinedInput, Select, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"
import { FaqList } from "@/libs/components/admin/cs/faqList"
import { Add, CancelRounded } from "@mui/icons-material"
import { FaqInquiry } from "@/libs/types/faq/faq.input"
import { FaqCategory, FaqStatus } from "@/libs/enum/faq.enum"
import { start } from "repl"

const Faq: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [membersInquiry, setMembersInquiry] = useState<MembersInquiry>(initialProps)
    const [faqInquiry, setFaqInquiry] = useState<FaqInquiry>(initialProps)
    const [value, setValue] = useState<string>("ALL")
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

    const textHandler = (text: string) => {
        setFaqInquiry({ ...faqInquiry, search: { ...faqInquiry.search, text } })
    }

    const handleSearchStatus = (status: string) => {
        if (status !== "ALL") {
            setFaqInquiry({ ...faqInquiry, search: { ...faqInquiry.search, faqStatus: status } })
        } else {
            delete faqInquiry.search.faqStatus;
            setFaqInquiry(faqInquiry)
        }
    }

    const handleSearchCategory = (category: string) => {
        if (category !== "ALL") {
            setFaqInquiry({ ...faqInquiry, search: { ...faqInquiry.search, faqCategory: category } })
        } else {
            delete faqInquiry.search.faqCategory;
            setFaqInquiry(faqInquiry)
        }
        setValue(category)
    }

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
                    FAQ Management
                </Box>
                <>
                    <Button style={{ backgroundColor: "gray", width: "150px", marginTop: "30px", fontWeight: "bold", color: "white" }}>
                        <div>ADD</div>
                        <Add />
                    </Button>
                </>
                <Stack>
                    <Stack className="search-panel">
                        <Stack className="status" direction={"row"} gap={"10px"}>
                            <Box className={!faqInquiry?.search?.faqStatus ? 'on' : ''} onClick={() => handleSearchStatus("ALL")}>ALL</Box>
                            <Stack
                                direction={"row"}
                                className={faqInquiry?.search?.faqStatus === FaqStatus.ACTIVE ? 'on' : ''}
                                onClick={() => handleSearchStatus(FaqStatus.ACTIVE)}
                            >
                                <div>Active</div>
                                <div>(0)</div>
                            </Stack>
                            <Stack
                                direction={"row"}
                                className={faqInquiry?.search?.faqStatus === FaqStatus.BLOCK ? 'on' : ''}
                                onClick={() => handleSearchStatus(FaqStatus.BLOCK)}
                            >
                                <div>Blocked</div>
                                <div>(0)</div>
                            </Stack>
                            <Stack
                                direction={"row"}
                                className={faqInquiry?.search?.faqStatus === FaqStatus.DELETE ? 'on' : ''}
                                onClick={() => handleSearchStatus(FaqStatus.DELETE)}
                            >
                                <div>Deleted</div>
                                <div>(0)</div>
                            </Stack>
                        </Stack>
                        <Stack className="search-area" direction={"row"} alignItems={"center"} justifyContent={"end"}>
                            <OutlinedInput
                                value={faqInquiry.search.text}
                                onChange={(e: any) => textHandler(e.target.value)}
                                sx={{ width: '100%' }}
                                className={'search'}
                                placeholder="Search user name"
                                endAdornment={
                                    <>
                                        {faqInquiry.search.text && (
                                            <CancelRounded
                                                style={{ cursor: 'pointer' }}
                                                onClick={async () => {
                                                    setFaqInquiry({
                                                        ...faqInquiry,
                                                        search: {
                                                            ...faqInquiry?.search,
                                                            text: '',
                                                        },
                                                    });
                                                    // await getAllProductsRefetch({ input: productsInquiry })
                                                }}
                                            />
                                        )}
                                    </>
                                }
                            />
                            <Select sx={{ width: '160px', ml: '20px' }} value={value}>
                                <MenuItem value={"ALL"} onClick={() => handleSearchCategory('ALL')}>
                                    All
                                </MenuItem>
                                {
                                    Object.values(FaqCategory).map((category: string) => (
                                        <MenuItem value={category} onClick={() => handleSearchCategory(category)}>
                                            {category}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <Box className="table-list">
                        <FaqList
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

Faq.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(Faq)