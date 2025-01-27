import { Place } from "@mui/icons-material";
import {
    Box,
    Button,
    Stack,
    Tab,
    Tabs,
} from "@mui/material"
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/apollo/user/query";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface Brand {
    _id: string,
    name: string,
    desc: string,
    img: string,
    address: string
}
const allBrands: Brand[] = [
    {
        _id: "1",
        name: "MSI",
        desc: "MSI's gaming laptops are celebrated for their powerful performance, advanced cooling solutions, and stunning displays, making them a top choice for gamers seeking a competitive edge. Their motherboards and graphics cards are engineered to provide exceptional stability, efficiency, and overclocking capabilities, catering to both enthusiasts and professional users. Additionally, MSI's desktop PCs combine robust hardware with sleek designs, offering reliable and high-performance solutions for various computing needs.",
        img: "adsadsa",
        address: "South Korea buk-gu 120-3"
    },
    {
        _id: "2",
        name: "Apple",
        desc: "MSI's gaming laptops are celebrated for their powerful performance, advanced cooling solutions, and stunning displays, making them a top choice for gamers seeking a competitive edge. Their motherboards and graphics cards are engineered to provide exceptional stability, efficiency, and overclocking capabilities, catering to both enthusiasts and professional users. Additionally, MSI's desktop PCs combine robust hardware with sleek designs, offering reliable and high-performance solutions for various computing needs.",
        img: "adsadsa",
        address: "South Korea buk-gu 120-3"
    },
    {
        _id: "3",
        name: "lenove",
        desc: "MSI's gaming laptops are celebrated for their powerful performance, advanced cooling solutions, and stunning displays, making them a top choice for gamers seeking a competitive edge. Their motherboards and graphics cards are engineered to provide exceptional stability, efficiency, and overclocking capabilities, catering to both enthusiasts and professional users. Additionally, MSI's desktop PCs combine robust hardware with sleek designs, offering reliable and high-performance solutions for various computing needs.",
        img: "adsadsa",
        address: "South Korea buk-gu 120-3"
    },

]

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const OurBrands = () => {
    //Initialization
    const [value, setValue] = useState<number>(1)

    

    //Handlers
    const handleValue = (event: any, num: number) => {
        setValue(num)
    }
    return (
        <>
            <Stack className={"brands"}>
                <Stack className="container">
                    <Stack className="info" alignItems={"center"}>
                        <div className="title">Our Brands</div>
                        <div className="subtitle">Trusted Computer Brands Delivering Quality, Performance, and Cutting-Edge Technology</div>
                    </Stack>
                    <Stack direction={"row"} className="brand-list">
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleValue}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 3, borderColor: 'gray' }}
                            className={"control-panel"}
                        >
                            {
                                allBrands.map((ele: any, num: number) => (
                                    <Tab disableRipple label={ele.name} {...a11yProps(num)} style={value === num ? { color: "white", fontWeight: "bold" } : { color: "gray", fontWeight: "bold" }} />
                                ))
                            }
                        </Tabs>
                        {
                            allBrands.map((ele: any, num: number) => (
                                <TabPanel value={value} index={num}>
                                    <Stack className="brand-info" direction={"row"}>
                                        <Stack>
                                            <div className="title">
                                                {ele.name}
                                            </div>
                                            <div className="desc">
                                                {ele.desc}
                                            </div>
                                            <Stack className={"address"} direction={"row"}>
                                                <Place />
                                                <div>{ele.address}</div>
                                            </Stack>
                                            <Button>
                                                View Brand
                                            </Button>
                                        </Stack>
                                        <Stack className={"brand-img"}>
                                            <img src="/img/banner/banner-1.jpeg" alt="" />
                                        </Stack>
                                    </Stack>
                                </TabPanel>
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default OurBrands