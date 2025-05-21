import {
    Box,
    Stack,
    Tab,
    Tabs,
} from "@mui/material"
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MEMBERS } from "@/apollo/user/query";
import { Member, MemberType } from "@/libs/types/member/member";
import { serverApi } from "@/libs/config";
import { useRouter } from "next/router";
import HoverButton from "../others/HoverButton";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";

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
    const [retailers, setRetailers] = useState([])
    const [scrollEnable, setScrollEnable] = useState(false)
    const router = useRouter()
    const device = useDeviceDetect();

    useEffect(() => {
        const handleScrollAos = () => {
            setScrollEnable(window.scrollY > 170)
        }
        window.addEventListener("scroll", handleScrollAos)
        return () => {
            window.removeEventListener("scroll", handleScrollAos)
        }
    }, [])

    const { } = useQuery(GET_MEMBERS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                page: 1,
                limit: 5,
                sort: "createdAt",
                search: {
                    memberType: MemberType.RETAILER
                }
            }
        },
        onCompleted: ({ getMembers }) => {
            setRetailers(getMembers.list)
        }
    })

    //Handlers
    const handleValue = (event: any, num: number) => {
        setValue(num)
    }
    return (
        <>
            <Stack className={device === "mobile" ? "brands aos-animate" : scrollEnable ? "brands aos-animate transition duration-1000" : "brands transition duration-1000"} data-aos="fade-down">
                <Stack className="container">
                    <Stack className="info" alignItems={"center"}>
                        <div className="title">Our Retailers</div>
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
                                retailers.map((member: Member, num: number) => (
                                    <Tab disableRipple label={member.memberNick} {...a11yProps(num)} style={value === num ? { color: "white", fontWeight: "bold" } : { color: "gray", fontWeight: "bold" }} />
                                ))
                            }
                        </Tabs>
                        {
                            retailers.map((member: Member, num: number) => {
                                const memberImage = member.memberImage ? `${serverApi}/${member.memberImage}` : "/img/profile/image.svg"
                                return (
                                    <TabPanel value={value} index={num} key={num}>
                                        <Stack className="brand-info" direction={"row"}>
                                            <Stack>
                                                <div className="title">
                                                    {member.memberNick}
                                                </div>
                                                <div className="desc">
                                                    {member.memberDesc ?? "No Description"}
                                                </div>
                                                <Box
                                                    onClick={() => {
                                                        const link = `/retailers/detail?id=${member._id}`
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <HoverButton text="Discover"/>
                                                </Box>
                                            </Stack>
                                            <Stack className={"brand-img"}>
                                                <img src={memberImage} alt="" />
                                            </Stack>
                                        </Stack>
                                    </TabPanel>
                                )
                            })
                        }
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default OurBrands