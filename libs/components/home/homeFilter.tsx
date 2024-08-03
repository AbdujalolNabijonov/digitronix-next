import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { ProductCompany, ProductType } from '@/libs/enum/product.enum';
import { MagnifyingGlass, SlidersHorizontal } from 'phosphor-react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    outline: 'none',
    boxShadow: 24,
};

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: '200px',
        },
    },
};

const thisYear = new Date().getFullYear();



const HomeFilter = (props: any) => {
    const { initialInput } = props;
    const companyRef: any = useRef();
    const typeRef: any = useRef();
    const roomsRef: any = useRef();
    const router = useRouter();
    const device: string = "desktop"
    const [searchFilter, setSearchFilter] = useState<any>({})
    const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
    const [openCompany, setOpenCompany] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [openRooms, setOpenRooms] = useState(false);
    const [productCompany, setProductCompany] = useState<ProductCompany[]>(Object.values(ProductCompany));
    const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
    const [yearCheck, setYearCheck] = useState({ start: 1970, end: thisYear });
    const [optionCheck, setOptionCheck] = useState('all');

    /** LIFECYCLES **/
    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (!companyRef?.current?.contains(event.target)) {
                setOpenCompany(false);
            }

            if (!typeRef?.current?.contains(event.target)) {
                setOpenType(false);
            }

            if (!roomsRef?.current?.contains(event.target)) {
                setOpenRooms(false);
            }
        };

        document.addEventListener('mousedown', clickHandler);

        return () => {
            document.removeEventListener('mousedown', clickHandler);
        };
    }, []);

    /** HANDLERS **/
    const advancedFilterHandler = (status: boolean) => {
        setOpenCompany(false);
        setOpenRooms(false);
        setOpenType(false);
        setOpenAdvancedFilter(status);
    };

    const locationStateChangeHandler = () => {
        setOpenCompany((prev) => !prev);
        setOpenRooms(false);
        setOpenType(false);
    };

    const typeStateChangeHandler = () => {
        setOpenType((prev) => !prev);
        setOpenCompany(false);
        setOpenRooms(false);
    };

    const roomStateChangeHandler = () => {
        setOpenRooms((prev) => !prev);
        setOpenType(false);
        setOpenCompany(false);
    };

    const disableAllStateHandler = () => {
        setOpenRooms(false);
        setOpenType(false);
        setOpenCompany(false);
    };

    const productCompanySelectHandler = useCallback(
        async (value: any) => {
            try {
                setSearchFilter({
                    ...searchFilter,
                    search: {
                        ...searchFilter.search,
                        companyList: [value],
                    },
                });
                typeStateChangeHandler();
            } catch (err: any) {
                console.log('ERROR, propertyLocationSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const productTypeSelectHandler = useCallback(
        async (value: any) => {
            try {
                setSearchFilter({
                    ...searchFilter,
                    search: {
                        ...searchFilter.search,
                        typeList: [value],
                    },
                });
                roomStateChangeHandler();
            } catch (err: any) {
                console.log('ERROR, propertyTypeSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const propertyRoomSelectHandler = useCallback(
        async (value: any) => {
            try {
                setSearchFilter({
                    ...searchFilter,
                    search: {
                        ...searchFilter.search,
                        roomsList: [value],
                    },
                });
                disableAllStateHandler();
            } catch (err: any) {
                console.log('ERROR, propertyRoomSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const propertyBedSelectHandler = useCallback(
        async (number: Number) => {
            try {
                if (number != 0) {
                    if (searchFilter?.search?.bedsList?.includes(number)) {
                        setSearchFilter({
                            ...searchFilter,
                            search: {
                                ...searchFilter.search,
                                bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
                            },
                        });
                    } else {
                        setSearchFilter({
                            ...searchFilter,
                            search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
                        });
                    }
                } else {
                    delete searchFilter?.search.bedsList;
                    setSearchFilter({ ...searchFilter });
                }

                console.log('propertyBedSelectHandler:', number);
            } catch (err: any) {
                console.log('ERROR, propertyBedSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const propertyOptionSelectHandler = useCallback(
        async (e: any) => {
            try {
                const value = e.target.value;
                setOptionCheck(value);

                if (value !== 'all') {
                    setSearchFilter({
                        ...searchFilter,
                        search: {
                            ...searchFilter.search,
                            options: [value],
                        },
                    });
                } else {
                    delete searchFilter.search.options;
                    setSearchFilter({
                        ...searchFilter,
                        search: {
                            ...searchFilter.search,
                        },
                    });
                }
            } catch (err: any) {
                console.log('ERROR, propertyOptionSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const propertySquareHandler = useCallback(
        async (e: any, type: string) => {
            const value = e.target.value;

            if (type == 'start') {
                setSearchFilter({
                    ...searchFilter,
                    search: {
                        ...searchFilter.search,
                        // @ts-ignore
                        squaresRange: { ...searchFilter.search.squaresRange, start: parseInt(value) },
                    },
                });
            } else {
                setSearchFilter({
                    ...searchFilter,
                    search: {
                        ...searchFilter.search,
                        // @ts-ignore
                        squaresRange: { ...searchFilter.search.squaresRange, end: parseInt(value) },
                    },
                });
            }
        },
        [searchFilter],
    );

    const yearStartChangeHandler = async (event: any) => {
        setYearCheck({ ...yearCheck, start: Number(event.target.value) });

        setSearchFilter({
            ...searchFilter,
            search: {
                ...searchFilter.search,
                periodsRange: { start: Number(event.target.value), end: yearCheck.end },
            },
        });
    };

    const yearEndChangeHandler = async (event: any) => {
        setYearCheck({ ...yearCheck, end: Number(event.target.value) });

        setSearchFilter({
            ...searchFilter,
            search: {
                ...searchFilter.search,
                periodsRange: { start: yearCheck.start, end: Number(event.target.value) },
            },
        });
    };

    const resetFilterHandler = () => {
        setSearchFilter(initialInput);
        setOptionCheck('all');
        setYearCheck({ start: 1970, end: thisYear });
    };

    const pushSearchHandler = async () => {
        try {
            if (searchFilter?.search?.locationList?.length == 0) {
                delete searchFilter.search.locationList;
            }

            if (searchFilter?.search?.typeList?.length == 0) {
                delete searchFilter.search.typeList;
            }

            if (searchFilter?.search?.roomsList?.length == 0) {
                delete searchFilter.search.roomsList;
            }

            if (searchFilter?.search?.options?.length == 0) {
                delete searchFilter.search.options;
            }

            if (searchFilter?.search?.bedsList?.length == 0) {
                delete searchFilter.search.bedsList;
            }

            await router.push(
                `/property?input=${JSON.stringify(searchFilter)}`,
                `/property?input=${JSON.stringify(searchFilter)}`,
            );
        } catch (err: any) {
            console.log('ERROR, pushSearchHandler:', err);
        }
    };

    if (device === 'mobile') {
        return <div>HEADER FILTER MOBILE</div>;
    } else {
        return (
            <>
                <Stack className={'search-box'} gap={"10px"}>
                    <Stack className={'select-box'} gap={"5px"}>
                        <Box component={'div'} className={`box ${openCompany ? 'on' : ''}`} onClick={locationStateChangeHandler}>
                            <span>{searchFilter?.search?.companyList ? searchFilter?.search?.companyList[0] : ('Company')} </span>
                            <ExpandMoreIcon />
                        </Box>
                        <Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
                            <span> {searchFilter?.search?.typeList ? searchFilter?.search?.typeList[0] : ('Type')} </span>
                            <ExpandMoreIcon />
                        </Box>
                        <Box className={`box ${openRooms ? 'on' : ''}`} onClick={roomStateChangeHandler}>
                            <span>
                                {searchFilter?.search?.roomsList ? `${searchFilter?.search?.roomsList[0]} gen}` : ('Gen')}
                            </span>
                            <ExpandMoreIcon />
                        </Box>
                    </Stack>
                    <Stack className={'search-box-other'} gap={"10px"}>
                        <Box className={'advanced-filter'} onClick={() => advancedFilterHandler(true)}>
                            <SlidersHorizontal size={24} />
                            <span>{('Advanced')}</span>
                        </Box>
                        <Box className={'search-btn'} onClick={pushSearchHandler}>
                            <Button>
                                <MagnifyingGlass size={32} />
                            </Button>
                        </Box>
                    </Stack>

                    {/*MENU */}
                    <div className={`filter-location ${openCompany ? 'on' : ''}`} ref={companyRef}>
                        {productCompany.map((company: string) => {
                            return (
                                <div onClick={() => productCompanySelectHandler(location)} key={company}>
                                    <img src={`img/banner/cities/${company}.webp`} alt="" />
                                    <span>{company}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
                        {productType.map((type: string) => {
                            return (
                                <div
                                    style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.jpg)` }}
                                    onClick={() => productTypeSelectHandler(type)}
                                    key={type}
                                >
                                    <span>{type}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className={`filter-rooms ${openRooms ? 'on' : ''}`} ref={roomsRef}>
                        {[1, 2, 3, 4, 5].map((room: number) => {
                            return (
                                <span onClick={() => propertyRoomSelectHandler(room)} key={room}>
                                    {room} room{room > 1 ? 's' : ''}
                                </span>
                            );
                        })}
                    </div>
                </Stack>

                {/* ADVANCED FILTER MODAL */}
                <Modal
                    open={openAdvancedFilter}
                    onClose={() => advancedFilterHandler(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* @ts-ignore */}
                    <Box sx={style}>
                        <Box className={'advanced-filter-modal'}>
                            <div className={'close'} onClick={() => advancedFilterHandler(false)}>
                                <CloseIcon />
                            </div>
                            <div className={'top'}>
                                <span>Find your home</span>
                                <div className={'search-input-box'}>
                                    <img src="/img/icons/search.svg" alt="" />
                                    <input
                                        value={searchFilter?.search?.text ?? ''}
                                        type="text"
                                        placeholder={'What are you looking for?'}
                                        onChange={(e: any) => {
                                            setSearchFilter({
                                                ...searchFilter,
                                                search: { ...searchFilter.search, text: e.target.value },
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <Divider sx={{ mt: '30px', mb: '35px' }} />
                            <div className={'middle'}>
                                <div className={'row-box'}>
                                    <div className={'box'}>
                                        <span>bedrooms</span>
                                        <div className={'inside'}>
                                            <div
                                                className={`room ${!searchFilter?.search?.bedsList ? 'active' : ''}`}
                                                onClick={() => propertyBedSelectHandler(0)}
                                            >
                                                Any
                                            </div>
                                            {[1, 2, 3, 4, 5].map((bed: number) => (
                                                <div
                                                    className={`room ${searchFilter?.search?.bedsList?.includes(bed) ? 'active' : ''}`}
                                                    onClick={() => propertyBedSelectHandler(bed)}
                                                    key={bed}
                                                >
                                                    {bed == 0 ? 'Any' : bed}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={'box'}>
                                        <span>options</span>
                                        <div className={'inside'}>
                                            <FormControl>
                                                <Select
                                                    value={optionCheck}
                                                    onChange={propertyOptionSelectHandler}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value={'all'}>All Options</MenuItem>
                                                    <MenuItem value={'propertyBarter'}>Barter</MenuItem>
                                                    <MenuItem value={'propertyRent'}>Rent</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className={'row-box'} style={{ marginTop: '44px' }}>
                                    <div className={'box'}>
                                        <span>Year Built</span>
                                        <div className={'inside space-between align-center'}>
                                            <FormControl sx={{ width: '122px' }}>
                                                <Select
                                                    value={yearCheck.start.toString()}
                                                    onChange={yearStartChangeHandler}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    MenuProps={MenuProps}
                                                >
                                                    {[1970, 2000, 2001]?.slice(0)?.map((year: number) => (
                                                        <MenuItem value={year} disabled={yearCheck.end <= year} key={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <div className={'minus-line'}></div>
                                            <FormControl sx={{ width: '122px' }}>
                                                <Select
                                                    value={yearCheck.end.toString()}
                                                    onChange={yearEndChangeHandler}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    MenuProps={MenuProps}
                                                >
                                                    {[1970, 1971, 1972]
                                                        ?.slice(0)
                                                        .reverse()
                                                        .map((year: number) => (
                                                            <MenuItem value={year} disabled={yearCheck.start >= year} key={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className={'box'}>
                                        <span>square meter</span>
                                        <div className={'inside space-between align-center'}>
                                            <FormControl sx={{ width: '122px' }}>
                                                <Select
                                                    value={searchFilter?.search?.squaresRange?.start}
                                                    onChange={(e: any) => propertySquareHandler(e, 'start')}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    MenuProps={MenuProps}
                                                >
                                                    {[10, 20, 3, 40].map((square: number) => (
                                                        <MenuItem
                                                            value={square}
                                                            disabled={(searchFilter?.search?.squaresRange?.end || 0) < square}
                                                            key={square}
                                                        >
                                                            {square}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <div className={'minus-line'}></div>
                                            <FormControl sx={{ width: '122px' }}>
                                                <Select
                                                    value={searchFilter?.search?.squaresRange?.end}
                                                    onChange={(e: any) => propertySquareHandler(e, 'end')}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    MenuProps={MenuProps}
                                                >
                                                    {[0, 20, 4, 50, 60].map((square: number) => (
                                                        <MenuItem
                                                            value={square}
                                                            disabled={(searchFilter?.search?.squaresRange?.start || 0) > square}
                                                            key={square}
                                                        >
                                                            {square}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider sx={{ mt: '60px', mb: '18px' }} />
                            <div className={'bottom'}>
                                <div onClick={resetFilterHandler}>
                                    <img src="/img/icons/reset.svg" alt="" />
                                    <span>Reset all filters</span>
                                </div>
                                <Button
                                    startIcon={<img src={'/img/icons/search.svg'} />}
                                    className={'search-btn'}
                                    onClick={pushSearchHandler}
                                >
                                    Search
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Modal>
            </>
        );
    }
};

HomeFilter.defaultProps = {
    initialInput: {
        page: 1,
        limit: 9,
        search: {
            squaresRange: {
                start: 0,
                end: 500,
            },
            pricesRange: {
                start: 0,
                end: 2000000,
            },
        },
    },
};

export default HomeFilter;