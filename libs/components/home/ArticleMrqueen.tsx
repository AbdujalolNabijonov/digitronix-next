import { Marquee } from "@/components/magicui/marquee";
import HorizontalCard from "./horizontalCard";
import { useEffect, useState } from "react";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import { Article } from "@/libs/types/article/article";



interface ArticleLoopProps {
    navigatetoPageHandler: any;
    newsArticles: Article[]
    humarArticles: Article[]
    freeArticles: Article[]
}



export function ArticleLoop(props: ArticleLoopProps) {
    const { navigatetoPageHandler, newsArticles, humarArticles, freeArticles } = props
    const [scrollAos, setScrollAos] = useState(false)
    const device = useDeviceDetect()
    
    useEffect(() => {
        const handleScrollAos = () => {
            setScrollAos(window.scrollY > 3700)
        }
        window.addEventListener("scroll", handleScrollAos)

        return () => {
            window.removeEventListener("scroll", handleScrollAos)
        }
    }, [])
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            {
                newsArticles && newsArticles.length > 0 ? (
                    <Marquee pauseOnHover className={device === "mobile" ? "[--duration:40s] aos-animate" : scrollAos ? "[--duration:40s] aos-animate transition duration-1500" : "[--duration:40s] transition duration-1000"} data-aos="fade-left">
                        {newsArticles.map((article, index) => (
                            <HorizontalCard key={index} navigatetoPageHandler={navigatetoPageHandler} article={article} />
                        ))}
                    </Marquee>
                ) : null
            }

            {
                humarArticles && humarArticles.length > 0 ? (
                    <Marquee reverse pauseOnHover className={device === "mobile" ? "[--duration:40s] aos-animate" : scrollAos ? "[--duration:40s] aos-animate transition duration-1500" : "[--duration:40s] transition duration-1000"} data-aos="fade-right">
                        {humarArticles.map((article, index) => (
                            <HorizontalCard key={index} navigatetoPageHandler={navigatetoPageHandler} article={article} />
                        ))}
                    </Marquee>
                ) : null
            }

            {
                freeArticles && freeArticles.length > 0 ? (
                    <Marquee pauseOnHover className={device === "mobile" ? "[--duration:40s] aos-animate" : scrollAos ? "[--duration:40s] aos-animate transition duration-1500" : "[--duration:40s] transition duration-1000"} data-aos="fade-left">
                        {freeArticles.map((article, index) => (
                            <HorizontalCard key={index} navigatetoPageHandler={navigatetoPageHandler} article={article} />
                        ))}
                    </Marquee>
                ) : null
            }

            <div className="pointer-events-none absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-gradient-to-l from-black"></div>
        </div>
    );
}
