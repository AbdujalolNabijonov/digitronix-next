import { NextPage } from "next";
import { Box, Divider, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { EventObj } from "@/libs/types/event/event";

const events = [
    {
        eventTitle: "MSIology is a profound subject, eagerly awaiting your personal experience.",
        eventContent: "In this area, we exhibit the latest models representing MSI laptop’s 20 years of achievements, along with a variety of commemorative 20th-anniversary limited edition products, dedicated to every visitor of the MSI laptop 20th Anniversary Exhibition. ",
        eventImage: "/img/event/event1.jpg",
    },
    {
        eventTitle: "Experience the extreme performance and innovative technology.",
        eventContent: "Through a series of hands-on experience zones, audiences can understand why MSI laptops have consistently prioritized high performance for gamers, creators, and business professionals over the past 20 years.",
        eventImage: "/img/event/event2.jpg",
    },
    {
        eventTitle: "Step into the time tunnel and witness the splendor of MSI laptops over the past 20 years.",
        eventContent: "The exhibition uses photos and videos to recount MSI laptops' 20-year journey, showcasing their leading performance, design, and innovations.",
        eventImage: "/img/event/event3.jpg",
    }
]

const Event: NextPage = () => {
    return (
        <>
            <Stack className="event">
                <Stack className="container">
                    <div className="title">
                        Explore <span>Events</span>
                    </div>
                    <div>
                        <Swiper
                            effect={'coverflow'}
                            centeredSlides={true}
                            slidesPerView={3}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            navigation={true}
                            pagination={true}
                            modules={[EffectCoverflow, Navigation, Autoplay]}
                            className="event-swiper"
                            initialSlide={0}
                        >
                            {
                                events.map((ele: EventObj, index: number) => (
                                    <SwiperSlide key={index} >
                                        <Box className={"card"} style={{ backgroundImage: `url(${ele.eventImage})` }}>
                                            <Stack className="card-info">
                                                <div className="title">
                                                    {ele.eventTitle}
                                                </div>
                                                <div className="context">
                                                    {ele.eventContent}
                                                </div>
                                                <Divider variant="middle" sx={{borderColor:"black"}}/>
                                                <div className="event-time">
                                                    10:27
                                                </div>
                                            </Stack>
                                        </Box>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </Stack>
            </Stack>
        </>
    )
}

export default Event