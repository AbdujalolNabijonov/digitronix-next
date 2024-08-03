import { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

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
                                Array.from({ length: 7 }).map(ele => (
                                    <SwiperSlide>
                                        <Box className={"card"} style={{ backgroundImage: 'url("/img/products/gaming-3.jpg")' }}>
                                            <div className="title">
                                                This is Event
                                            </div>
                                            <div className="context">
                                                Something happened Yesterday
                                            </div>

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