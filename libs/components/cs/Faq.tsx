import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import Tab from '@mui/material/Tab'
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material"
import { useState } from "react"
import TabPanel from "@mui/lab/TabPanel"
import { ExpandMore } from "@mui/icons-material"
import { faqList } from "@/libs/config"

const Faq = () => {
    const [value, setValue] = useState<string>("1")
    const handleChangeValue = (e: any, value: any) => {
        setValue(value)
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
                    <Stack sx={{marginBottom:"20px"}}>
                        {
                            faqList[Number(value)].map(ele => (
                                <Accordion className="accor">
                                    <AccordionSummary
                                        expandIcon={<ExpandMore sx={{ fill: "white" }} />}
                                        aria-controls="panel1-content"
                                    >
                                        <Typography component="span" className="accor-title">{ele.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className="accor-body">{ele.answer}</AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Stack>
                </TabPanel>
            </TabContext>
        </Stack>
    )
}

export default Faq