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
import { GET_MEMBERS } from "@/apollo/user/query";
import { Member, MemberType } from "@/libs/types/member/member";
import { serverApi } from "@/libs/config";
import { useRouter } from "next/router";

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
    const router = useRouter()

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
            <Stack className={"brands"}>
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
                                    <TabPanel value={value} index={num}>
                                        <Stack className="brand-info" direction={"row"}>
                                            <Stack>
                                                <div className="title">
                                                    {member.memberNick}
                                                </div>
                                                <div className="desc">
                                                    {member.memberDesc}
                                                </div>
                                                <Button onClick={() => {
                                                    const link = `/retailers/detail?id=${member._id}`
                                                    router.push(link, link, { scroll: false })
                                                }}>
                                                    View Retailer
                                                </Button>
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