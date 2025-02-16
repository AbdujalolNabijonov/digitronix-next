import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Button } from '@mui/material';

export default function MobileBanner() {
    const progressCircle = useRef<any>(null);
    const progressContent = useRef<any>(null);
    const onAutoplayTimeLeft = (s: any, time: number, progress: any) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="banner-swiper"
            >
                <SwiperSlide className='swiper-slide'>
                    <img src="/img/banner/chair.webp" alt="" />
                    <Button variant='contained'>Gaming Chair</Button>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="/img/banner/laptop.jpg" alt="" />
                    <Button variant='contained'>Powerful & Portable</Button>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="/img/banner/graphics.jpg" alt="" />
                    <Button variant='contained'>High-Performance & Ultra-Realistic & Advanced Visuals</Button>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src="/img/banner/keyboard.jpeg" alt="" />
                    <Button variant='contained'>Comfort Peripheral</Button>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
}
