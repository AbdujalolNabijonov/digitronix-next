import Ads from "@/libs/components/home/Ads";
import OurBrands from "@/libs/components/home/ourBrands";
import TrendProduct from "@/libs/components/home/trendProducts";
import LayoutHome from "@/libs/components/layouts/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = (props: any) => {
  const device: string = "desktop"
  if (device === "mobile") {
    return (
      <>
        <h1>This is mobile device</h1>
      </>
    )
  } else if (device === "desktop") {
    return (
      <>
        <Stack className={"home-page"}>
          <OurBrands />
          <TrendProduct />
          <Ads />
        </Stack>
      </>
    );
  }
}


export default LayoutHome(Home)