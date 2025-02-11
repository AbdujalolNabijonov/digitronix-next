import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import Tab from '@mui/material/Tab'
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TabPanel from "@mui/lab/TabPanel"
import { ErrorOutline, ExpandMore } from "@mui/icons-material"
import { FaqObj } from "@/libs/types/faq/faq"
import { FaqCategory } from "@/libs/enum/faq.enum"
import { useQuery } from "@apollo/client"
import { GET_TARGET_FAQS } from "@/apollo/user/query"

const Faq = () => {
    const [value, setValue] = useState<string>("1")
    const [faqList, setFaqList] = useState<FaqObj[]>([])
    const [faqInquiry, setFaqInquiry] = useState({
        page: 1,
        limit: 10,
        search: {
            faqCategory: FaqCategory.GENERAL
        }
    })

    const {
        refetch: getTargetFaqsRefetch
    } = useQuery(GET_TARGET_FAQS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: faqInquiry },
        onCompleted: ({ getTargetFaqs }) => {
            setFaqList(getTargetFaqs.list)
        }
    })

    useEffect(() => {
        getTargetFaqsRefetch({ input: faqInquiry }).then()
    }, [faqInquiry])

    const handleChangeValue = async (e: any, value: any) => {
        setValue(value)
        switch (value) {
            case "1":
                faqInquiry.search.faqCategory = FaqCategory.GENERAL
                setFaqInquiry({ ...faqInquiry })
                break;
            case "2":
                faqInquiry.search.faqCategory = FaqCategory.SERVICES
                setFaqInquiry({ ...faqInquiry })
                break;
            case "3":
                faqInquiry.search.faqCategory = FaqCategory.BUY
                setFaqInquiry({ ...faqInquiry })
                break;
            case "4":
                faqInquiry.search.faqCategory = FaqCategory.COMMUNITY
                setFaqInquiry({ ...faqInquiry })
                break;
            case "5":
                faqInquiry.search.faqCategory = FaqCategory.CONTACT
                setFaqInquiry({ ...faqInquiry })
                break;
            default:
                break;
        }
    }
    return (
        <Stack>
            <TabContext value={value}>
                <Stack className="tabs-control">
                    <TabList onChange={handleChangeValue}>
                        <Tab label="General" value="1" className="tabs-item" />
                        <Tab label="Services" value="2" className="tabs-item" />
                        <Tab label="Buy" value="3" className="tabs-item" />
                        <Tab label="Community" value="4" className="tabs-item" />
                        <Tab label="Contact" value="5" className="tabs-item" />
                    </TabList>
                </Stack>
                <TabPanel value={value}>
                    <Stack sx={{ marginBottom: "20px" }}>
                        {
                            faqList.length > 0 ? faqList.map((faq: FaqObj, index: number) => (
                                <Accordion className="accor" key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore sx={{ fill: "white" }} />}
                                        aria-controls="panel1-content"
                                    >
                                        <Typography component="span" className="accor-title">{faq.faqQuestion}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className="accor-body">{faq.faqAnswer}</AccordionDetails>
                                </Accordion>
                            )) : (
                                <Stack
                                    alignItems={"center"}
                                    style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                    gap={"10px"}
                                >
                                    <ErrorOutline fontSize="large" />
                                    <div>No questions found!</div>
                                </Stack>
                            )
                        }
                    </Stack>
                </TabPanel>
            </TabContext>
        </Stack>
    )
}

export default Faq