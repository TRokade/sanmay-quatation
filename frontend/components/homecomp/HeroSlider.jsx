"use client";
import {
  ParallaxProvider,
  Carousel,
  ParallaxBanner,
  Typography,
} from "@/store/tailwindcomp";

import React from "react";
import SliderBtn from "./SliderBtn";
import { IconButton } from "@material-tailwind/react";

const HeroSlider = () => {
  return (
    <ParallaxProvider>
      {/* <SilderFlowbit/> */}
      <Carousel
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-0 md:left-7 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
              className="-ml-1 h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              ></path>
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !-right-1 md:!right-7 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
              className="ml-1 h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </IconButton>
        )}
      >
        <ParallaxBanner
          layers={[
            {
              image:
                "https://telkitchens.in/srckchn/uploads/2022/03/12-scaled.jpg",
              speed: -20,
            },
          ]}
          className="aspect-[2/1] h-screen"
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="slide-up flex flex-col items-center justify-center w-4/4 text-center mt-28  md:w-3/4 md:mt-0">
              <h1 className="mb-5 text-white md:pt-24 text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                Elegant Oak Wardrobe Collection
              </h1>
              <p className="mb-12 px-12 lg:w-3/4 text-white opacity-90">
                Discover timeless elegance with our oak wardrobes, crafted for
                those who value both style and functionality. Perfect for
                organizing your space while adding a touch of sophistication to
                any room.
              </p>
              <SliderBtn />
            </div>
          </div>
        </ParallaxBanner>
        <ParallaxBanner
          layers={[
            {
              image:
                "https://royal-room.com/upload/iblock/329/32968a52c65806792e01e467122f2ed9.jpg",
              speed: -20,
            },
          ]}
          className="aspect-[2/1] h-screen"
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="slide-up flex flex-col items-center justify-center w-4/4 text-center mt-28  md:w-3/4 md:mt-0">
              <h1 className="mb-5 text-white md:pt-24 text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                Modern Minimalist Wardrobes
              </h1>
              <p className="mb-12 px-12 xl:w-3/4 text-white opacity-80">
                Simplify your storage with our sleek and modern minimalist
                wardrobes. Designed for urban living, these pieces offer maximum
                space efficiency with a clean, contemporary look.
              </p>
              <SliderBtn />
            </div>
          </div>
        </ParallaxBanner>
        <ParallaxBanner
          layers={[
            {
              image:
                "https://i.pinimg.com/originals/57/b2/4b/57b24b1aabc5fc8d0f6f66c58ee0c313.jpg",
              speed: -20,
            },
          ]}
          className="aspect-[2/1] h-screen"
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="slide-up w-4/4 flex flex-col items-center justify-center text-center mt-28  md:w-3/4 md:mt-0">
              <h1 className="mb-5 text-white md:pt-24 text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                Versatile Wardrobe Solutions
              </h1>
              <p className="mb-12 lg:w-3/4 px-12 text-white opacity-80">
                Meet your storage needs with our versatile wardrobe range.
                Whether you need space for clothes, shoes, or accessories, these
                wardrobes adapt to your lifestyle with customizable features.
              </p>
              <SliderBtn />
            </div>
          </div>
        </ParallaxBanner>
      </Carousel>
    </ParallaxProvider>
  );
};

export default HeroSlider;
