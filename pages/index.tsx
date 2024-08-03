import React from "react";
import OurBrands from "@/libs/components/home/ourBrands";
import SortProduct from "@/libs/components/home/sortProduct";
import LayoutHome from "@/libs/components/layouts/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";
import SearchPc from "@/libs/components/home/searchPc";
import MonitorAds from "@/libs/components/home/monitorAds";
import Event from "@/libs/components/home/event";
import CommunityArticle from "@/libs/components/home/communityArticle";

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
          <SortProduct />
          <MonitorAds />
          <SearchPc />
          <Event />
          <CommunityArticle />
        </Stack>
      </>
    );
  }
}


export default LayoutHome(Home)