"use client";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/store/tailwindcomp";

const ProductScroll = () => {
  const products = [
    "https://i.pinimg.com/originals/49/5e/dd/495edd80eb725a3c3f753df78c3838ae.jpg",
    "https://domsmam.com/wp-content/uploads/2021/01/skaf-kupe-28.jpg",
    "https://assets.thefurnish.ru/system/uploads/product_image/image/227232/6e0f6cbd3cc303c3fdd99707eee7b0d5.jpeg",
    "https://static.wixstatic.com/media/a957d1_b55b9297948442a08b8c5c4209929c13~mv2.jpeg/v1/fill/w_980,h_1226,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a957d1_b55b9297948442a08b8c5c4209929c13~mv2.jpeg",
    "https://avatars.mds.yandex.net/i?id=8aac03fe0e828cb2eb11fbfbccd638c0_l-5427094-images-thumbs&ref=rim&n=13&w=2000&h=1200",
    "https://images.dwell.com/photos-6133522193393016832/6308716484001837056-large/reminiscent-of-tansu-japanese-design-komo-armoire-combines-asian-influence-with-modern-functionality.png",
    "https://i.pinimg.com/736x/5e/cb/c1/5ecbc193700827ea8e157fce6bf5ba1e.jpg",
    "https://cdn.shopify.com/s/files/1/0003/4668/5492/products/varese-oak-flush-interior-sliding-doors-thruslide-xl-joinery-modern-doors_1024x1024.jpg?v=1569242928",
  ];

  return (
    <div className="py-20 px-5 mx-auto sm:max-w-xl md:max-w-full  xl:px-32 lg:py-16 ">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-2xl md:text-3xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
          New Arrivals
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Discover innovative modular furniture designs that enhance your space
          with style and functionality.
        </p>
      </div>
      <div className="relative w-full sm:mx-0">
        {/* Left Arrow */}
        <div
          className="absolute opacity-40 lg:opacity-100 top-1/2 lg:left-[-9px] transform -translate-y-1/2 left-0 bg-gray-900 text-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-10"
          onClick={() => {
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: -200, behavior: "smooth" });
          }}
        >
          <IoIosArrowBack />
        </div>

        <div className=" text-center snap-x flex justify-items-center snap-mandatory overflow-x-scroll scroll-container">
          {products.map((item) => {
            return (
              <div
                key={item}
                className="inline-flex flex-col transition-opacity duration-300 ease-in-out items-center group p_container snap-center mx-6 flex-shrink-0 relative"
              >
                <img
                  src={item}
                  className="productimage w-80 lg:w-56 h-72"
                  alt={``}
                />
                <div className="flex group-hover:opacity-100 transition-opacity duration-300 ease-in-out lg:opacity-0 absolute top-48">
                  <Link href={"/collection/products"}>
                    <Button size="md" color="white">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute opacity-40 lg:opacity-100 top-1/2 transform lg:right-[-15px] -translate-y-1/2 right-0 bg-gray-900 text-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-10"
          onClick={() => {
            document
              .querySelector(".scroll-container")
              .scrollBy({ left: 200, behavior: "smooth" });
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default ProductScroll;
