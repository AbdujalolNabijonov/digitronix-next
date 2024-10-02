import { GraphicsSeries, GraphicsType, ProductCategory, ProductCore, ProductSeries } from "@/libs/enum/product.enum"
import { AmdCoreList, BrandsList, DisplayResolution, IntelCoreList } from "@/libs/types/product/product"
import { ProductsInquiry } from "@/libs/types/product/product.input"
import { CancelRounded, Computer, ExpandMore, HomeWorkOutlined, KeyboardDoubleArrowDownOutlined, KeyboardDoubleArrowUpOutlined, Memory, Refresh, Search, Tab, TabOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, IconButton, OutlinedInput, Stack, Tooltip, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { handleClientScriptLoad } from "next/script"
import { Monitor } from "phosphor-react"
import { useCallback, useEffect, useState } from "react"

interface ProductProps {
    setProductsInquiry: any,
    productsInquiry: ProductsInquiry
}

const ProductFilter = (props: ProductProps) => {
    const [showMore, setShowMore] = useState<boolean>(true)
    const [showMore1, setShowMore1] = useState<boolean>(false)
    const [showMore2, setShowMore2] = useState<boolean>(false)
    const [showMore3, setShowMore3] = useState<boolean>(false)
    const [showMore4, setShowMore4] = useState<boolean>(false)
    const [showMore5, setShowMore5] = useState<boolean>(false)
    const [showMore6, setShowMore6] = useState<boolean>(false)
    const [showMore7, setShowMore7] = useState<boolean>(false)
    const [extraMore, setExtraMore] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    const { setProductsInquiry, productsInquiry } = props
    const router = useRouter()

    //LifeCircle
    useEffect(() => {
        if (productsInquiry?.search?.serieList?.length === 0) {
            delete productsInquiry.search.serieList;
            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
        if (productsInquiry?.search?.processorList?.length === 0) {
            delete productsInquiry.search.processorList;
            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
        if (productsInquiry?.search?.graphicsList?.length === 0) {
            delete productsInquiry.search.graphicsList;
            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
        if (productsInquiry && !productsInquiry.search.text) {
            delete productsInquiry.search.text;
            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
        if (productsInquiry?.search?.displayList?.length === 0) {
            delete productsInquiry.search.displayList;
            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
        if (productsInquiry?.search.brandList?.length === 0) {
            delete productsInquiry.search.brandList;

            router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search } })}`,
                { scroll: false }
            ).then()
        }
    }, [productsInquiry])

    //handlers

    const handleSelectSerie = useCallback(
        async (e: any) => {
            const isChecked = e.target.checked;
            const serie = e.target.value
            try {
                if (isChecked) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, serieList: [...(productsInquiry.search.serieList || []), serie] } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, serieList: [...(productsInquiry.search.serieList || []), serie] } })}`,
                        { scroll: false }
                    )
                } else if (productsInquiry.search.serieList?.includes(serie)) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, serieList: productsInquiry.search.serieList.filter(item => item !== serie) } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, serieList: productsInquiry.search.serieList.filter(item => item !== serie) } })}`,
                        { scroll: false }
                    )
                }
            } catch (err: any) {
                console.log(`Error, handleSelectSerie ${err.message}`)
            }
        }, [productsInquiry])

    const handleSelectCore = useCallback(
        async (e: any) => {
            const isChecked = e.target.checked;
            const core = e.target.value;
            try {
                if (isChecked) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, processorList: [...(productsInquiry?.search?.processorList || []), core.split(" ").join("_").toUpperCase()] } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, processorList: [...(productsInquiry?.search?.processorList || []), core.split(" ").join("_").toUpperCase()] } })}`,
                        { scroll: false }
                    )
                } else if (productsInquiry.search.processorList?.includes(core.split(" ").join("_").toUpperCase())) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, processorList: productsInquiry.search.processorList.filter(item => item !== core.split(" ").join("_").toUpperCase()) } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, processorList: productsInquiry.search.processorList.filter(item => item !== core.split(" ").join("_").toUpperCase()) } })}`,
                        { scroll: false }
                    )
                }
            } catch (err: any) {
                console.log(`Error, handleSelectCore ${err.message}`)
            }
        }, [productsInquiry])

    const handleSelectGraphicsCard = useCallback(
        async (e: any) => {
            const isChecked = e.target.checked;
            const card = e.target.value;
            try {
                if (isChecked) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, graphicsList: [...(productsInquiry?.search?.graphicsList || []), card.split(" ").join("_").toUpperCase()] } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, graphicsList: [...(productsInquiry?.search?.graphicsList || []), card.split(" ").join("_").toUpperCase()] } })}`,
                        { scroll: false }
                    )
                } else if (productsInquiry.search.graphicsList?.includes(card.split(" ").join("_").toUpperCase())) {
                    await router.push(
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, graphicsList: productsInquiry.search.graphicsList.filter(item => item !== card.split(" ").join("_").toUpperCase()) } })}`,
                        `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, graphicsList: productsInquiry.search.graphicsList.filter(item => item !== card.split(" ").join("_").toUpperCase()) } })}`,
                        { scroll: false }
                    )
                }
            } catch (err: any) {
                console.log(`Error, handleSelectGraphicsCard ${err.message}`)
            }
        }, [productsInquiry])

    const handleSelectDisplayResolution = useCallback(async (e: any) => {
        try {
            const resolution = Number(e.target.value);
            if (productsInquiry.search.displayList?.includes(resolution)) {
                await router.push(
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, displayList: productsInquiry.search.displayList.filter((a) => a != resolution) } })}`,
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, displayList: productsInquiry.search.displayList.filter((a) => a != resolution) } })}`,
                    { scroll: false }
                )
            } else {
                await router.push(
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, displayList: [...productsInquiry.search.displayList || [], resolution] } })}`,
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, displayList: [...productsInquiry.search.displayList || [], resolution] } })}`,
                    { scroll: false }
                )
            }
        } catch (err: any) {
            console.log(`Error, handleSelectDisplayResolution ${err.message}`)
        }
    }, [productsInquiry])


    const handleSelectBrands = useCallback(async (e: any) => {
        const brand = e.target.value;
        try {
            if (productsInquiry.search.brandList?.includes(brand)) {
                await router.push(
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, brandList: productsInquiry.search.brandList.filter(ele => ele !== brand) } })}`,
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, brandList: productsInquiry.search.brandList.filter(ele => ele !== brand) } })}`,
                    { scroll: false }
                )
            } else {
                await router.push(
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, brandList: [...productsInquiry.search.brandList ?? [], brand] } })}`,
                    `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, brandList: [...productsInquiry.search.brandList ?? [], brand] } })}`,
                    { scroll: false }
                )
            }
        } catch (err: any) {
            console.log(`Error, handleSelectBrands ${err.message}`)
        }
    }, [productsInquiry])

    const refreshHandler = async () => {
        try {
            for (let objKey in productsInquiry.search) {
                if (objKey !== "productCategory") {
                    //@ts-ignore
                    delete productsInquiry?.search?.[objKey]
                }
            }
            await router.push(
                `products/?input=${JSON.stringify({ ...productsInquiry })}`,
                `products/?input=${JSON.stringify({ ...productsInquiry })}`,
                { scroll: false }
            )
            setProductsInquiry(productsInquiry)
            setSearchText("")
        } catch (err: any) {
            console.log(`Error, refreshHandler ${err.message}`)
        }
    }

    const handleChangeText = async (e: any) => {
        const value = e.target.value;
        setSearchText(value)
        await router.push(
            `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, text: value } })}`,
            `products/?input=${JSON.stringify({ ...productsInquiry, search: { ...productsInquiry.search, text: value } })}`,
            { scroll: false }
        )
    }
    return (
        <Stack className="control-panel">
            <Stack className={'find-your-device'}>
                <Typography className={'title-main'}>Find Your Device</Typography>
                <Stack className={'input-box'} direction={"row"} alignItems={"center"}>
                    <OutlinedInput
                        value={searchText}
                        type={'text'}
                        className={'search-input'}
                        placeholder={'What are you looking for?'}
                        onChange={handleChangeText}
                        onKeyDown={(event: any) => {
                            if (event.key == 'Enter') {
                                setProductsInquiry({ ...productsInquiry, search: { ...productsInquiry.search, text: searchText } });
                            }
                        }}
                        endAdornment={
                            <>
                                <CancelRounded
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setSearchText('');
                                        setProductsInquiry({ ...productsInquiry, search: { ...productsInquiry.search, text: "" } });
                                    }}
                                />
                            </>
                        }
                        style={{ color: "black" }}
                    />
                    <img src={'/img/icons/search_icon.png'} alt={''} />
                    <Tooltip title="Reset">
                        <IconButton onClick={refreshHandler}>
                            <Refresh style={{ color: "white", cursor: "pointer" }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "0px 1px", borderRadius: "0" }}
                expanded={showMore}
                onChange={() => setShowMore(!showMore)}
            >
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} sx={{ color: "white" }}>
                    <span><Computer /></span>
                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>Gaming Series</span>
                </AccordionSummary>
                {Object.values(ProductSeries).map((serie: string, num: number) => {
                    if ([1, 2, 3].includes(num)) return (
                        <AccordionDetails>
                            <Stack className={'checkbox-item'} key={serie} direction={"row"}>
                                <Checkbox
                                    id={serie}
                                    className="checkbox"
                                    color="default"
                                    size="small"
                                    value={serie}
                                    checked={(productsInquiry?.search?.serieList || []).includes(serie as ProductSeries)}
                                    onChange={handleSelectSerie}
                                />
                                <label htmlFor={serie} style={{ cursor: 'pointer' }}>
                                    <Typography className="property-type">{serie}</Typography>
                                </label>
                            </Stack>
                        </AccordionDetails>
                    )
                })}
                <Accordion
                    sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0", border: "none" }}
                    expanded={extraMore}
                    onMouseEnter={() => setExtraMore(true)}
                    onMouseLeave={() => setExtraMore(false)}
                >
                    <AccordionSummary sx={{ color: "white" }}>
                        <span>{extraMore ? <KeyboardDoubleArrowDownOutlined /> : <KeyboardDoubleArrowUpOutlined />}</span>
                        <span style={{ marginLeft: "10px" }}>Show {extraMore ? "all.." : "less.."}</span>
                    </AccordionSummary>
                    {Object.values(ProductSeries).map((serie: string, num: number) => {
                        if (![1, 2, 3, 4].includes(num)) return (
                            <AccordionDetails>
                                <Stack className={'checkbox-item'} key={serie} direction={"row"}>
                                    <Checkbox
                                        id={serie}
                                        className="checkbox"
                                        color="default"
                                        size="small"
                                        value={serie}
                                        checked={(productsInquiry?.search?.serieList || []).includes(serie as ProductSeries)}
                                        onChange={handleSelectSerie}
                                    />
                                    <label htmlFor={serie} style={{ cursor: 'pointer' }}>
                                        <Typography className="property-type">{serie}</Typography>
                                    </label>
                                </Stack>
                            </AccordionDetails>
                        )
                    })}
                </Accordion>
            </Accordion>
            {
                productsInquiry?.search?.productCategory === ProductCategory.GRAPHICS ? (
                    <Stack>
                        <Accordion
                            sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                            expanded={showMore1}
                            onMouseEnter={() => setShowMore1(true)}
                            onMouseLeave={() => setShowMore1(false)}
                        >
                            <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
                                <Stack>
                                    
                                </Stack>
                                <div style={{ marginLeft: "10px", fontWeight: "600", color:"white" }}>Intel Platform</div>
                            </AccordionSummary>
                            {[2, 4, 6, 8, 10, 12, 16, 20, 24].map((store: number) => (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <Stack className={'checkbox-item'} key={store} direction={"row"}>
                                        <Checkbox
                                            id={String(store)}
                                            className="checkbox"
                                            color="default"
                                            size="small"
                                            value={store}
                                            checked={false}
                                            onChange={handleSelectCore}
                                        />
                                        <label htmlFor={String(store)} style={{ cursor: 'pointer' }}>
                                            <Typography className="property-type">{store}GB</Typography>
                                        </label>
                                    </Stack>
                                </AccordionDetails>
                            ))}
                        </Accordion>
                    </Stack>
                ) : (
                    <Box className="core-sec">
                        <Stack direction={"row"}>
                            <><Memory /></>
                            <>Proccessor</>
                        </Stack>
                        <Stack>
                            <Accordion
                                sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                                expanded={showMore1}
                                onMouseEnter={() => setShowMore1(true)}
                                onMouseLeave={() => setShowMore1(false)}
                            >
                                <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                                    <div style={{ marginLeft: "10px", fontWeight: "600" }}>Intel Platform</div>
                                </AccordionSummary>
                                {IntelCoreList.map((core: string) => (
                                    <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                        <Stack className={'checkbox-item'} key={core} direction={"row"}>
                                            <Checkbox
                                                id={core}
                                                className="checkbox"
                                                color="default"
                                                size="small"
                                                value={core}
                                                checked={(productsInquiry?.search?.processorList || []).includes(core.split(" ").join("_").toUpperCase())}
                                                onChange={handleSelectCore}
                                            />
                                            <label htmlFor={core} style={{ cursor: 'pointer' }}>
                                                <Typography className="property-type">{core}</Typography>
                                            </label>
                                        </Stack>
                                    </AccordionDetails>
                                ))}
                            </Accordion>
                            <Accordion
                                sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                                expanded={showMore2}
                                onMouseEnter={() => setShowMore2(true)}
                                onMouseLeave={() => setShowMore2(false)}
                            >
                                <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>AMD Platform</span>
                                </AccordionSummary>
                                {AmdCoreList.map((core: string) => (
                                    <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                        <Stack className={'checkbox-item'} key={core} direction={"row"}>
                                            <Checkbox
                                                id={core}
                                                className="checkbox"
                                                color="default"
                                                size="small"
                                                value={core}
                                                checked={(productsInquiry?.search?.processorList || []).includes(core.split(" ").join("_").toUpperCase())}
                                                onChange={handleSelectCore}
                                            />
                                            <label htmlFor={core} style={{ cursor: 'pointer' }}>
                                                <Typography className="property-type">{core}</Typography>
                                            </label>
                                        </Stack>
                                    </AccordionDetails>
                                ))}
                            </Accordion>
                        </Stack>
                    </Box>
                )
            }
            <Box className="core-sec">
                <Stack direction={"row"}>
                    <img src="/img/icons/graphics-card-white.svg" alt="" />
                    <>Graphics</>
                </Stack>
                <Stack>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore3}
                        onMouseEnter={() => setShowMore3(true)}
                        onMouseLeave={() => setShowMore3(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                            <span style={{ marginLeft: "10px", fontWeight: "600", fontSize: "14px" }}>GeForce RTX™ 40 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("40")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px" }}>
                                    <Stack className={'checkbox-item'} key={card} direction={"row"}>
                                        <Checkbox
                                            id={card}
                                            className="checkbox"
                                            color="default"
                                            size="small"
                                            value={card}
                                            checked={(productsInquiry?.search?.graphicsList || []).includes(card.split(" ").join("_").toUpperCase())}
                                            onChange={handleSelectGraphicsCard}
                                        />
                                        <label htmlFor={card} style={{ cursor: 'pointer' }}>
                                            <Typography className="property-type">{card}</Typography>
                                        </label>
                                    </Stack>
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore4}
                        onMouseEnter={() => setShowMore4(true)}
                        onMouseLeave={() => setShowMore4(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                            <span style={{ marginLeft: "10px", fontWeight: "600", fontSize: "14px" }}>GeForce RTX™ 30 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("30")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "10px" }}>
                                    <Stack className={'checkbox-item'} key={card} direction={"row"} >
                                        <Checkbox
                                            id={card}
                                            className="checkbox"
                                            color="default"
                                            size="small"
                                            value={card}
                                            checked={(productsInquiry?.search?.graphicsList || []).includes(card.split(" ").join("_").toUpperCase())}
                                            onChange={handleSelectGraphicsCard}
                                        />
                                        <label htmlFor={card} style={{ cursor: 'pointer' }}>
                                            <Typography className="property-type">{card}</Typography>
                                        </label>
                                    </Stack>
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore4}
                        onMouseEnter={() => setShowMore4(true)}
                        onMouseLeave={() => setShowMore4(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                            <span style={{ marginLeft: "10px", fontWeight: "600", fontSize: "14px" }}>GeForce RTX™ 20 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("20")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <Stack className={'checkbox-item'} key={card} direction={"row"}>
                                        <Checkbox
                                            id={card}
                                            className="checkbox"
                                            color="default"
                                            size="small"
                                            value={card}
                                            checked={(productsInquiry?.search?.graphicsList || []).includes(card.split(" ").join("_").toUpperCase())}
                                            onChange={handleSelectGraphicsCard}
                                        />
                                        <label htmlFor={card} style={{ cursor: 'pointer' }}>
                                            <Typography className="property-type">{card}</Typography>
                                        </label>
                                    </Stack>
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore5}
                        onMouseEnter={() => setShowMore5(true)}
                        onMouseLeave={() => setShowMore5(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} className="extra-list">
                            <span style={{ marginLeft: "10px", fontWeight: "600", fontSize: "13px" }}>AMD Radeon 6000M Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("Radeon")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <Stack className={'checkbox-item'} key={card} direction={"row"}>
                                        <Checkbox
                                            id={card}
                                            className="checkbox"
                                            color="default"
                                            size="small"
                                            value={card}
                                            checked={(productsInquiry?.search?.graphicsList || []).includes(card.split(" ").join("_").toUpperCase())}
                                            onChange={handleSelectGraphicsCard}
                                        />
                                        <label htmlFor={card} style={{ cursor: 'pointer' }}>
                                            <Typography className="property-type">{card}</Typography>
                                        </label>
                                    </Stack>
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                </Stack>
            </Box>
            {
                productsInquiry?.search?.productCategory === ProductCategory.LAPTOP ? (
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore6}
                        onMouseEnter={() => setShowMore6(true)}
                        onMouseLeave={() => setShowMore6(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} sx={{ color: "white" }}>
                            <TabOutlined />
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>Display</span>
                        </AccordionSummary>
                        {DisplayResolution.map((resolution: string) => (
                            <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "14px" }}>
                                <Stack className={'checkbox-item'} key={resolution} direction={"row"}>
                                    <Checkbox
                                        id={resolution}
                                        className="checkbox"
                                        color="default"
                                        size="small"
                                        value={resolution}
                                        checked={(productsInquiry?.search?.displayList || []).includes(Number(resolution))}
                                        onChange={handleSelectDisplayResolution}
                                    />
                                    <label htmlFor={resolution} style={{ cursor: 'pointer' }}>
                                        <Typography className="property-type">{resolution}'</Typography>
                                    </label>
                                </Stack>
                            </AccordionDetails>
                        ))}
                    </Accordion>
                ) : null
            }
            <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                expanded={showMore7}
                onMouseEnter={() => setShowMore7(true)}
                onMouseLeave={() => setShowMore7(false)}
            >
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />} sx={{ color: "white" }}>
                    <HomeWorkOutlined />
                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>Brand</span>
                </AccordionSummary>
                {BrandsList.map((brand: string) => (
                    <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                        <Stack className={'checkbox-item'} key={brand} direction={"row"}>
                            <Checkbox
                                id={brand}
                                className="checkbox"
                                color="default"
                                size="small"
                                value={brand}
                                checked={(productsInquiry?.search?.brandList || []).includes(brand)}
                                onChange={handleSelectBrands}
                            />
                            <label htmlFor={brand} style={{ cursor: 'pointer' }}>
                                <Typography className="property-type">{brand}</Typography>
                            </label>
                        </Stack>
                    </AccordionDetails>
                ))}
            </Accordion>
        </Stack>
    )
}

export default ProductFilter