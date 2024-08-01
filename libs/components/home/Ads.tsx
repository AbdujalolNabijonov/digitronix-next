import { NextPage } from "next";

const Ads: NextPage = () => {

    return (
        <>
            <div className="home-ads">
                <div className="container">
                    <div className="camera"></div>
                    <video muted loop autoPlay>
                        <source type="video/mp4" src="/vids/home/1.mp4" />
                    </video>
                    <div className="monitor-footer"></div>
                </div>
            </div>
        </>
    )
}

export default Ads