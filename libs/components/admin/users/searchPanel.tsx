import { MemberStatus, MemberType } from "@/libs/types/member/member"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { CancelRounded } from "@mui/icons-material"
import { Box, InputAdornment, MenuItem, OutlinedInput, Select, Stack } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const SearchPanel: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [inputSearch, setInputSearch] = useState<MembersInquiry>(initialProps)
    const [searchText, setSearchText] = useState<string>('')
    const [searchType, setSearchType] = useState<MemberType>(MemberType.ALL)
    //Handlers
    const handleSearchStatus = (status: any) => {
        setInputSearch({ ...inputSearch, search: { memberStatus: status } })
    }
    const textHandler = (text: string) => {
        setSearchText(text)
    }
    const handleSearchType = (type: any) => {
        setSearchType(type)
    }
    const searchTextHandler = () => {
        alert("data came")
    }
    return (
        <>
            <Stack className="search-panel">
                <Stack className="status" direction={"row"} gap={"10px"}>
                    <Box className={!inputSearch?.search?.memberStatus ? 'on' : ''} onClick={() => handleSearchStatus(null)}>All</Box>
                    <Box className={inputSearch?.search?.memberStatus === MemberStatus.ACTIVE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.ACTIVE)}>Active</Box>
                    <Box className={inputSearch?.search?.memberStatus === MemberStatus.BLOCK ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.BLOCK)}>Blocked</Box>
                    <Box className={inputSearch?.search?.memberStatus === MemberStatus.DELETE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.DELETE)}>Deleted</Box>
                </Stack>
                <Stack className="search-area" direction={"row"} alignItems={"center"}>
                    <OutlinedInput
                        value={searchText}
                        onChange={(e: any) => textHandler(e.target.value)}
                        sx={{ width: '100%' }}
                        className={'search'}
                        placeholder="Search user name"
                        onKeyDown={(event) => {
                            if (event.key == 'Enter') searchTextHandler();
                        }}
                        endAdornment={
                            <>
                                {searchText && (
                                    <CancelRounded
                                        style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            setSearchText('');
                                            setInputSearch({
                                                ...inputSearch,
                                                search: {
                                                    ...inputSearch?.search,
                                                    text: '',
                                                },
                                            });
                                            // await getAllMembersReftch({ input: membersInquiry })
                                        }}
                                    />
                                )}
                                <InputAdornment position="end" onClick={() => searchTextHandler()}>
                                    <img src="/img/icons/search_icon.png" alt={'searchIcon'} />
                                </InputAdornment>
                            </>
                        }
                    />
                    <Select sx={{ width: '160px', ml: '20px' }} value={searchType}>
                        <MenuItem value={'ALL'} onClick={() => handleSearchType('ALL')}>
                            All
                        </MenuItem>
                        <MenuItem value={'USER'} onClick={() => handleSearchType('USER')}>
                            User
                        </MenuItem>
                        <MenuItem value={'AGENT'} onClick={() => handleSearchType('AGENT')}>
                            Agent
                        </MenuItem>
                        <MenuItem value={'ADMIN'} onClick={() => handleSearchType('ADMIN')}>
                            Admin
                        </MenuItem>
                    </Select>
                </Stack>
            </Stack>
        </>
    )
}

SearchPanel.defaultProps = {
    initialProps: {
        page: 1,
        limit: 10,
        sort: "createdAt",
        search: {}
    }
}

export default SearchPanel