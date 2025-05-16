import { NextPage } from "next";
import { Box, Divider, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventObj } from "@/libs/types/event/event";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";

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
    const [scrollAos, setScrollAos] = useState(false)
    const device = useDeviceDetect()

    useEffect(() => {
        const handleScrollAos = () => {
            setScrollAos(window.scrollY > 3000)
        }
        window.addEventListener("scroll", handleScrollAos);
        return () => {
            window.removeEventListener("scroll", handleScrollAos)
        }
    }, [])
    return (
        <>
            <Stack className="event">
                <Stack className="container">
                    <div className="title">
                        Explore <span>Events</span>
                    </div>
                    <Box className="relative">
                        <div className="prev-navii absolute left-0 top-[40%] z-20 cursor-pointer w-[60px] h-[60px] bg-gray-200 flex justify-center items-center rounded-full hover:bg-gray-500">
                            <ArrowBackIosOutlined />
                        </div>
                        <div className="next-navii absolute right-0 top-[40%] z-20 cursor-pointer w-[60px] h-[60px] bg-gray-200 flex justify-center items-center rounded-full hover:bg-gray-500">
                            <ArrowForwardIosOutlined />
                        </div>
                        <Swiper
                            slidesPerView={device === "mobile" ? 1 : 3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: ".next-navii",
                                prevEl: ".prev-navii"
                            }}
                            keyboard={true}
                            modules={[Navigation]}
                            className="event-swiper"
                        >
                            {
                                events.map((ele: EventObj, index: number) => (
                                    <SwiperSlide key={index}>
                                        <Box style={{ backgroundImage: `url(${ele.eventImage})` }} className={device === "mobile" ? "card aos-animate" : scrollAos ? "aos-animate transition duration-2000 card" : "transition duration-2000 card"} data-aos="fade-left" data-aos-duration={`${3000 * index}`}>
                                            <Stack className="card-info">
                                                <div className="title">
                                                    {ele.eventTitle}
                                                </div>
                                                <div className="context">
                                                    {ele.eventContent}
                                                </div>
                                                <Divider variant="middle" sx={{ borderColor: "black" }} />
                                                <div className="event-time">
                                                    10:27
                                                </div>
                                            </Stack>
                                        </Box>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

export default Event