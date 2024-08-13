import { MemberStatus, MemberType } from "@/libs/types/member/member"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { ProductStatus } from "@/libs/types/product/product"
import { ProductsInquiry } from "@/libs/types/product/product.input"
import { CancelRounded } from "@mui/icons-material"
import { Box, InputAdornment, MenuItem, OutlinedInput, Select, Stack } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const SearchPanel: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [inputSearch, setInputSearch] = useState<ProductsInquiry>(initialProps)
    const [searchText, setSearchText] = useState<string>('')
    const [searchType, setSearchType] = useState<MemberType>(MemberType.ALL)
    //Handlers
    const handleSearchStatus = (status: any) => {
        setInputSearch({ ...inputSearch, search: { productStatus: status } })
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
                    <Box className={!inputSearch?.search?.productStatus ? 'on' : ''} onClick={() => handleSearchStatus(null)}>All</Box>
                    <Box className={inputSearch?.search?.productStatus === ProductStatus.ACTIVE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.ACTIVE)}>Active</Box>
                    <Box className={inputSearch?.search?.productStatus === ProductStatus.SOLD ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.BLOCK)}>Sold</Box>
                    <Box className={inputSearch?.search?.productStatus === ProductStatus.DELETE ? 'on' : ''} onClick={() => handleSearchStatus(MemberStatus.DELETE)}>Deleted</Box>
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
                        <MenuItem value={'DESKTOP'} onClick={() => handleSearchType('DESKTOP')}>
                            Desktop
                        </MenuItem>
                        <MenuItem value={'LAPTOP'} onClick={() => handleSearchType('LAPTOP')}>
                            Laptop
                        </MenuItem>
                        <MenuItem value={'PERIPHERAL'} onClick={() => handleSearchType('PERIPHERAL')}>
                            Peripheral
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