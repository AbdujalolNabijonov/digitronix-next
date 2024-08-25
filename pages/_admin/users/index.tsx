import { MemberPanelList } from "@/libs/components/admin/users/membersPanelList";
import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin";
import { MembersInquiry } from "@/libs/types/member/member.input";
import { Box, InputAdornment, MenuItem, OutlinedInput, Select, Stack, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getJwtToken } from "@/libs/auth";
import { useRouter } from "next/router";
import { CancelRounded, Search } from "@mui/icons-material";
import { Member, MemberStatus, MemberType } from "@/libs/types/member/member";
import { NextPage } from "next";
import { useQuery } from "@apollo/client"
import { GET_ALL_MEMBERS_BY_ADMIN } from "@/apollo/admin/query";
import { UPDATE_MEMBER_BY_ADMIN } from "@/apollo/admin/mutation";
import { useMutation } from "@apollo/client"
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { useReactiveVar } from "@apollo/client"
import { userVar } from "@/apollo/store";

const AdminUser: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [membersInquiry, setMembersInquiry] = useState<MembersInquiry>(initialProps)
    const [members, setMembers] = useState<Member[]>([])
    const [membersTotal, setMembersTotal] = useState<number>(0);
    const [value, setValue] = useState<string>("ALL")
    const router = useRouter();
    const userInfo = useReactiveVar(userVar)

    //Apollo Request
    const {
        loading: getAllMembersLoading,
        data: getAllMembersData,
        error: getAllMembersError,
        refetch: getAllMembersReftch
    } = useQuery(GET_ALL_MEMBERS_BY_ADMIN, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: membersInquiry },
        onCompleted: (data) => {
            setMembers(data.getAllMembersByAdmin.list)
            setMembersTotal(data.getAllMembersByAdmin.metaCounter[0].total ?? 0)
        }
    })

    const [updateMemberByAdmin] = useMutation(UPDATE_MEMBER_BY_ADMIN)

    //LifeCircle
    useEffect(() => {
        const jwtToken = getJwtToken();
        if (!jwtToken) {
            router.push("/")
        }
    }, [])

    useEffect(()=>{
        if(userInfo.memberType !== MemberType.ADMIN){
            router.push("/")
        }
    },[])


    //Handlers
    const changePageHandler = async (event: unknown, newPage: number) => {
        membersInquiry.page = newPage + 1;
        await getAllMembersReftch({ input: membersInquiry })
        setMembersInquiry({ ...membersInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        membersInquiry.limit = parseInt(event.target.value, 10);
        membersInquiry.page = 1;
        await getAllMembersReftch({ input: membersInquiry })
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

    //HandleSearchPanel
    const handleSearchStatus = async (status: any) => {
        if (status !== "ALL") {
            setMembersInquiry({ ...membersInquiry, search: { ...membersInquiry.search, memberStatus: status } })
        } else {
            delete membersInquiry.search.memberStatus;
            setMembersInquiry({ ...membersInquiry })
        }
        await getAllMembersReftch({ input: membersInquiry })
    }
    const textHandler = async (text: string) => {
        setMembersInquiry({ ...membersInquiry, search: { ...membersInquiry.search, text } })
        await getAllMembersReftch({ input: membersInquiry })
    }
    const handleSearchType = async (type: any) => {
        setValue(type)
        if (type !== "ALL") {
            setMembersInquiry({ ...membersInquiry, search: { ...membersInquiry.search, memberType: type } })
        } else {
            delete membersInquiry.search.memberType
            setMembersInquiry({ ...membersInquiry })
        }
        await getAllMembersReftch({ input: membersInquiry })
    }

    const updateMemberHandler = async (updateData: any) => {
        try {
            await updateMemberByAdmin({ variables: { input: updateData } });
            menuIconCloseHandler();
            await getAllMembersReftch({ input: membersInquiry })
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

    return <>
        <Stack className="admin-user" >
            <Box className="title">
                Users
            </Box>
            <Stack>
                <Stack className="search-panel">
                    <Stack className="status" direction={"row"} gap={"10px"}>
                        <Box className={!membersInquiry?.search?.memberStatus ? 'on' : ''} onClick={() => handleSearchStatus("ALL")}>ALL</Box>
                        <Box className={membersInquiry?.search?.memberStatus === MemberStatus.ACTIVE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.ACTIVE)}>Active</Box>
                        <Box className={membersInquiry?.search?.memberStatus === MemberStatus.BLOCK ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.BLOCK)}>Block</Box>
                        <Box className={membersInquiry?.search?.memberStatus === MemberStatus.DELETE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.DELETE)}>Delete</Box>
                    </Stack>
                    <Stack className="search-area" direction={"row"} alignItems={"center"}>
                        <OutlinedInput
                            value={membersInquiry.search.text}
                            onChange={(e: any) => textHandler(e.target.value)}
                            sx={{ width: '100%' }}
                            className={'search'}
                            placeholder="Search user name"
                            endAdornment={
                                <>
                                    {membersInquiry.search.text && (
                                        <CancelRounded
                                            style={{ cursor: 'pointer' }}
                                            onClick={async () => {
                                                setMembersInquiry({ ...membersInquiry, search: { text: '' } });
                                                setMembersInquiry({
                                                    ...membersInquiry,
                                                    search: {
                                                        ...membersInquiry?.search,
                                                        text: '',
                                                    },
                                                });
                                                // await getAllMembersReftch({ input: membersInquiry })
                                            }}
                                        />
                                    )}
                                </>
                            }
                        />
                        <Select sx={{ width: '160px', ml: '20px' }} value={value}>
                            <MenuItem value={"ALL"} onClick={() => handleSearchType('ALL')}>
                                All
                            </MenuItem>
                            <MenuItem value={MemberType.ADMIN} onClick={() => handleSearchType(MemberType.ADMIN)}>
                                Admin
                            </MenuItem>
                            <MenuItem value={MemberType.RETAILER} onClick={() => handleSearchType(MemberType.RETAILER)}>
                                Retailer
                            </MenuItem>
                            <MenuItem value={MemberType.USER} onClick={() => handleSearchType(MemberType.USER)}>
                                User
                            </MenuItem>
                        </Select>
                    </Stack>
                </Stack>
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