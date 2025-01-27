import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HomeBanner = () => {
    const router = useRouter()
    useEffect(() => {
        const accordionItems = document.querySelectorAll("#accordion > li");

        accordionItems.forEach((item) => {
            if (window.innerWidth > 767) {
                item?.addEventListener("mouseenter", handleAccordion);
            } else {
                item?.addEventListener("touchstart", handleAccordion);
            }
        });

        return () => {
            accordionItems.forEach((item) => {
                item.removeEventListener("mouseenter", handleAccordion);
            });
        };
    }, []);

    const handleAccordion = (e: Event): void => {
        e.stopPropagation();
        const item = e.currentTarget as HTMLElement;

        if (item.classList.contains("out")) {
            item.classList.add("out");
        } else {
            item.classList.add("out");
            Array.from(item.parentNode!.children).forEach((sibling) => {
                if (sibling !== item) {
                    sibling.classList.remove("out");
                }
            });
        }
    };

    return (
        <div className="site-outer">
            <div className="site-inner">
                <section className="container-fluid">
                    <div className="row">
                        <ul className="accordion-group" id="accordion">
                            <li
                                style={{
                                    backgroundImage: 'url("/img/banner/chair.jpg")',
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Well design & Comfort Chair</h3>
                                <section className="hidden-xs" onClick={() => {
                                    const url = `/products?input=${JSON.stringify({ "page": 1, "limit": 6, "direction": -1, "search": { "productCategory": "CHAIR" } })}`
                                    router.push(url, url, { scroll: false })
                                }}>
                                    <article>
                                        <p>Gaming Chair</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                className="out"
                                style={{
                                    backgroundImage: "url('/img/banner/laptop.jpg')",
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Gaming Laptops</h3>
                                <section className="hidden-xs" onClick={() => {
                                    const url = `/products?input=${JSON.stringify({ "page": 1, "limit": 6, "direction": -1, "search": { "productCategory": "LAPTOP" } })}`
                                    router.push(url, url, { scroll: false })
                                }}>
                                    <article>
                                        <p>Powerful & Portable</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                style={{
                                    backgroundImage: `url("/img/banner/graphics.jpg")`,
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Latest Graphics Card</h3>
                                <section className="hidden-xs" onClick={() => {
                                    const url = `/products?input=${JSON.stringify({ "page": 1, "limit": 6, "direction": -1, "search": { "productCategory": "GRAPHICS" } })}`
                                    router.push(url, url, { scroll: false })
                                }}>
                                    <article>
                                        <p>High-Performance & Ultra-Realistic & Advanced Visuals</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                style={{
                                    backgroundImage: `url("/img/banner/keyboard.jpg")`,
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Comfort Peripheral</h3>
                                <section className="hidden-xs" onClick={() => {
                                    const url = `/products?input=${JSON.stringify({ "page": 1, "limit": 6, "direction": -1, "search": { "productCategory": "KEYBOARD" } })}`
                                    router.push(url, url, { scroll: false })
                                }}>
                                    <article>
                                        <p>Responsive & Durable & Stylish</p>
                                    </article>
                                </section>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeBanner;
