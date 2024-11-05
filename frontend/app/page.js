import CategoriesTabs from "@/components/homecomp/CategoriesTabs";
import Dummy from "@/components/homecomp/Dummy";
import HeroSlider from "@/components/homecomp/HeroSlider";
import ProductScroll from "@/components/homecomp/ProuductScroll";
import ShopNowBanner from "@/components/homecomp/ShopNowBanner";
import VisionandMission from "@/components/homecomp/VisionandMission";
import React from "react";

export default function Home() {
  return (
    <>
     <HeroSlider />
      <CategoriesTabs />
      {/* <ProductScroll /> */}
      {/* <BestSellerComp /> */}
      {/* <HowitsWork /> */}
      <VisionandMission />
      <Dummy />
      <ShopNowBanner />
    </>
  );
}