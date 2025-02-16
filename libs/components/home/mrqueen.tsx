import Marquee from "react-fast-marquee"

const LoopBrand = () => {
    const barandImages = [
        "/img/icons/acer.png",
        "/img/icons/apple.png",
        "/img/icons/asus.png",
        "/img/icons/hp.png",
        "/img/icons/msi.png",
        "/img/icons/nvidia.png",
        "/img/icons/alien.png",
        "/img/icons/rog.png",
    ]
    return (
        <Marquee autoFill style={{ backgroundColor: "aliceblue" }} className="brand-loop">
            {
                barandImages.map((imagePath: string, index: number) => (
                    <img
                        src={imagePath}
                        key={index}
                        alt="img"
                    />
                ))
            }
        </Marquee>
    )
}

export default LoopBrand