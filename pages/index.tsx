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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoopBrand from "@/libs/components/home/mrqueen";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import MobileBanner from "@/libs/components/home/mobileBanner";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
const Home: NextPage = (props: any) => {
  const device: string = useDeviceDetect()
  if (device === "mobile") {
    return (
      <>
        <MobileBanner />
        <LoopBrand />
        <OurBrands />
        <SortProduct />
        <MonitorAds />
        <Event />
        <CommunityArticle />
      </>
    )
  } else if (device === "desktop") {
    return (
      <>
        <Stack className={"home-page"}>
          <LoopBrand />
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