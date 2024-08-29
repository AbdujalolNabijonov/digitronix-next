import { GraphicsType, ProductSeries } from "@/libs/enum/product.enum"
import { AmdCoreList, BrandsList, DisplayResolution, IntelCoreList } from "@/libs/types/product/product"
import { CancelRounded, Computer, ExpandMore, HomeWorkOutlined, KeyboardDoubleArrowDownOutlined, KeyboardDoubleArrowUpOutlined, Memory, Refresh, Tab, TabOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, IconButton, OutlinedInput, Stack, Tooltip } from "@mui/material"
import { Monitor } from "phosphor-react"
import { useState } from "react"

const ProductFilter = () => {
    const [showMore, setShowMore] = useState<boolean>(true)
    const [showMore1, setShowMore1] = useState<boolean>(false)
    const [showMore2, setShowMore2] = useState<boolean>(false)
    const [showMore3, setShowMore3] = useState<boolean>(false)
    const [showMore4, setShowMore4] = useState<boolean>(false)
    const [showMore5, setShowMore5] = useState<boolean>(false)
    const [showMore6, setShowMore6] = useState<boolean>(false)
    const [showMore7, setShowMore7] = useState<boolean>(false)
    const [extraMore, setExtraMore] = useState<boolean>(false)

    return (
        <Stack className="control-panel">
            <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "0px 1px", borderRadius: "0" }}
                expanded={showMore}
                onChange={() => setShowMore(!showMore)}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <span><Computer /></span>
                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>Gaming Series</span>
                </AccordionSummary>
                {Object.values(ProductSeries).map((serie: string, num: number) => {
                    if ([1, 2, 3].includes(num)) return (
                        <AccordionDetails>
                            <FormControlLabel control={<Checkbox defaultChecked className={"checkbox"} />} className={"checkbox-item"} label={serie} />
                        </AccordionDetails>
                    )
                })}
                <Accordion
                    sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0", border: "none" }}
                    expanded={extraMore}
                    onMouseEnter={() => setExtraMore(true)}
                    onMouseLeave={() => setExtraMore(false)}
                >
                    <AccordionSummary>
                        <span>{extraMore ? <KeyboardDoubleArrowDownOutlined /> : <KeyboardDoubleArrowUpOutlined />}</span>
                        <span style={{ marginLeft: "10px" }}>Show {extraMore ? "all.." : "less.."}</span>
                    </AccordionSummary>
                    {Object.values(ProductSeries).map((serie: string, num: number) => {
                        if (![1, 2, 3, 4].includes(num)) return (
                            <AccordionDetails>
                                <FormControlLabel control={<Checkbox defaultChecked className={"checkbox"} />} className={"checkbox-item"} label={serie} />
                            </AccordionDetails>
                        )
                    })}
                </Accordion>
            </Accordion>
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
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>Intel Platform</span>
                        </AccordionSummary>
                        {IntelCoreList.map((core: string) => (
                            <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={core} />
                            </AccordionDetails>
                        ))}
                    </Accordion>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore2}
                        onMouseEnter={() => setShowMore2(true)}
                        onMouseLeave={() => setShowMore2(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>AMD Platform</span>
                        </AccordionSummary>
                        {AmdCoreList.map((core: string) => (
                            <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={core} />
                            </AccordionDetails>
                        ))}
                    </Accordion>
                </Stack>
            </Box>
            <Box className="core-sec">
                <Stack direction={"row"}>
                    <img src="/img/icons/graphics-card.svg" alt="" />
                    <>Graphics</>
                </Stack>
                <Stack>
                    <Accordion
                        sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                        expanded={showMore3}
                        onMouseEnter={() => setShowMore3(true)}
                        onMouseLeave={() => setShowMore3(false)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>GeForce RTX™ 40 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("40")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={card} />
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
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>GeForce RTX™ 30 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("30")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={card} />
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
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>GeForce RTX™ 20 Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("20")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={card} />
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
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <span style={{ marginLeft: "10px", fontWeight: "600" }}>AMD Radeon™ 6000M Series</span>
                        </AccordionSummary>
                        {Object.values(GraphicsType).map((card: string) => {
                            if (card.includes("6000M")) return (
                                <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                                    <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbo-item" label={card} />
                                </AccordionDetails>
                            )
                        })}
                    </Accordion>
                </Stack>
            </Box>
            <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                expanded={showMore6}
                onMouseEnter={() => setShowMore6(true)}
                onMouseLeave={() => setShowMore6(false)}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <TabOutlined />
                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>Display</span>
                </AccordionSummary>
                {DisplayResolution.map((resolution: string) => (
                    <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                        <FormControlLabel control={<Checkbox defaultChecked className={"checkbox"} />} className={"checkbox-item"} label={resolution} />
                    </AccordionDetails>
                ))}
            </Accordion>
            <Accordion
                sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "0" }}
                expanded={showMore7}
                onMouseEnter={() => setShowMore7(true)}
                onMouseLeave={() => setShowMore7(false)}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <HomeWorkOutlined />
                    <span style={{ marginLeft: "10px", fontWeight: "600" }}>Brand</span>
                </AccordionSummary>
                {BrandsList.map((brand: string) => (
                    <AccordionDetails sx={{ paddingLeft: "40px", fontSize: "12px" }}>
                        <FormControlLabel control={<Checkbox defaultChecked className="checkbox" />} className="checkbox-item" label={brand} />
                    </AccordionDetails>
                ))}
            </Accordion>
        </Stack>
    )
}

export default ProductFilter