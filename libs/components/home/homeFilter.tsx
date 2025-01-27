import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductCategory, ProductCompany, ProductSeries } from '@/libs/enum/product.enum';
import { MagnifyingGlass } from 'phosphor-react';
import { ProductsInquiry } from '@/libs/types/product/product.input';
import { Direction } from '@/libs/enum/common.enum';
import { useRouter } from 'next/router';

const HomeFilter = (props: any) => {
    const companyRef: any = useRef();
    const typeRef: any = useRef();
    const device: string = "desktop"
    const [searchFilter, setSearchFilter] = useState<ProductsInquiry>({
        page: 1,
        limit: 6,
        sort: "createdAt",
        direction: Direction.DESC,
        search: {}
    })
    const [openCompany, setOpenCompany] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [openRooms, setOpenRooms] = useState(false);
    const [productCompany] = useState<ProductCompany[]>(Object.values(ProductCompany));
    const router = useRouter()

    /** LIFECYCLES **/
    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (!companyRef?.current?.contains(event.target)) {
                setOpenCompany(false);
            }

            if (!typeRef?.current?.contains(event.target)) {
                setOpenType(false);
            }
        };
        document.addEventListener('mousedown', clickHandler);
        return () => {
            document.removeEventListener('mousedown', clickHandler);
        };
    }, []);

    /** HANDLERS **/
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
                searchFilter.search.brandList = [value]
                console.log(searchFilter)
                setSearchFilter({ ...searchFilter })
                typeStateChangeHandler();
            } catch (err: any) {
                console.log('ERROR, productBrandSelectionError:', err);
            }
        },
        [searchFilter],
    );

    const productCategorySelectHandler = useCallback(
        async (value: any) => {
            try {
                searchFilter.search.productCategory = value;
                setSearchFilter({ ...searchFilter })
                roomStateChangeHandler();
            } catch (err: any) {
                console.log('ERROR, propertyTypeSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const propertySerieSelectHandler = useCallback(
        async (value: any) => {
            try {
                searchFilter.search.serieList = [value]
                setSearchFilter({ ...searchFilter })
                disableAllStateHandler();
            } catch (err: any) {
                console.log('ERROR, propertyRoomSelectHandler:', err);
            }
        },
        [searchFilter],
    );

    const searchHandler = () => {
        const inputJson = JSON.stringify(searchFilter);
        const link = "/products/?input=" + inputJson
        router.push(link, link, { scroll: false })
    }


    if (device === 'mobile') {
        return <div>HEADER FILTER MOBILE</div>;
    } else {
        return (
            <>
                <Stack className={'search-box'} gap={"10px"}>
                    <Stack className={'select-box'} gap={"5px"}>
                        <Box component={'div'} className={`box ${openCompany ? 'on' : ''}`} onClick={locationStateChangeHandler}>
                            <span>{searchFilter.search?.brandList ? searchFilter?.search?.brandList[0] : ('Company')} </span>
                            <ExpandMoreIcon />
                        </Box>
                        <Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
                            <span> {searchFilter?.search?.productCategory ? searchFilter?.search?.productCategory : ('Category')} </span>
                            <ExpandMoreIcon />
                        </Box>
                        <Box className={`box ${openRooms ? 'on' : ''}`} onClick={roomStateChangeHandler}>
                            <span>
                                {searchFilter?.search?.serieList ? `${searchFilter?.search?.serieList[0]}` : ('Serie')}
                            </span>
                            <ExpandMoreIcon />
                        </Box>
                    </Stack>
                    <Stack className={'search-box-other'} gap={"10px"}>
                        <Box className={'search-btn'}>
                            <Button variant='contained' endIcon={<MagnifyingGlass size={32} />} onClick={searchHandler}>
                                Search
                            </Button>
                        </Box>
                    </Stack>
                    {/*MENU */}
                    <div className={`filter-brand ${openCompany ? 'on' : ''}`} ref={companyRef}>
                        {productCompany.map((company: string, index: number) => {
                            return (
                                <div onClick={() => productCompanySelectHandler(company)} key={index}>
                                    <img src={`/img/banner/${company.toLowerCase()}.jpg`} alt="" />
                                    <span>{company}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
                        {Object.values(ProductCategory).map((category: string, index: number) => {
                            return (
                                <div
                                    style={{ backgroundImage: `url(/img/banner/${category.toLowerCase()}.jpg)` }}
                                    onClick={() => productCategorySelectHandler(category)}
                                    key={index}
                                >
                                    <span>{category}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`filter-serie ${openRooms ? 'on' : ''}`}>
                        {Object.values(ProductSeries).map((serie: string, index: number) => {
                            return (
                                <span onClick={() => propertySerieSelectHandler(serie)} key={index}>
                                    {serie}
                                </span>
                            );
                        })}
                    </div>
                </Stack>
            </>
        );
    }
};


export default HomeFilter;