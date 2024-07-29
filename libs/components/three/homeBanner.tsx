import React, { useEffect } from "react";

const HomeBanner = () => {
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
                                    backgroundImage: 'url("/img/banner/banner-2.jpeg")',
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Pwerfull Processor</h3>
                                <section className="hidden-xs">
                                    <article>
                                        <p>Gaming & Effordable</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                className="out"
                                style={{
                                    backgroundImage: "url('/img/banner/banner-3.jpg')",
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Gaming Laptops</h3>
                                <section className="hidden-xs">
                                    <article>
                                        <p>Powerful & Portable</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                style={{
                                    backgroundImage: `url("/img/banner/banner-4.jpg")`,
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Latest Graphics Card</h3>
                                <section className="hidden-xs">
                                    <article>
                                        <p>High-Performance & Ultra-Realistic & Advanced Visuals</p>
                                    </article>
                                </section>
                            </li>
                            <li
                                style={{
                                    backgroundImage: `url("/img/banner/banner-5.jpeg")`,
                                }}
                            >
                                <div className="accordion-overlay"></div>
                                <h3>Comfort Peripheral</h3>
                                <section className="hidden-xs">
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
