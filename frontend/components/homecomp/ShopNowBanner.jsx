import Link from "next/link";
import { Button, Typography } from "@/store/tailwindcomp";
import React from "react";
import shopnow from "@/public/images/shopnowbanner.jpg";



const ShopNowBanner = () => {
  return (
    <div
      className="relative h-[500px] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${shopnow.src})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute grid h-full w-full items-center bg-black/75">
        <div className="w-4/4 lg:w-2/4 md:w-3/4 px-5 xl:px-24">
          <Typography
            variant="h1"
            color="white"
            className="mb-4 text-xl md:text-2xl lg:text-3xl"
          >
            Transform Your Space with Warsto
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mb-4 text-base md:text-base lg:text-lg opacity-80"
          >
            Discover precision-engineered wardrobes and storage solutions that
            blend innovation, style, and functionality. At Warsto, we offer
            customizable furniture designed to fit your unique needs, all
            available online with instant pricing and fast delivery. Experience
            effortless shopping and elevate your home today.
          </Typography>
          <div className="flex gap-2">
            <Link href={"/get-estimate"}>
              <Button size="md" color="white">
                Get Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNowBanner;
