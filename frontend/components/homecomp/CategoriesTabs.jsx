"use client";
import React from "react";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@/store/tailwindcomp";

import Opulence from "@/public/images/opulance.jpg"
import NexGen from "@/public/images/nexgen.jpg"
import SmartSpace from "@/public/images/smartspace.jpg"
import StyleShift from "@/public/images/styleshifts.jpg"
import Sovereign from "@/public/images/soveregin.jpg"
import Ornet from "@/public/images/ornet.jpg"


import Link from "next/link";

const CategoriesTabs = () => {
  const [activeTab, setActiveTab] = React.useState("Opulence");

  const data = [
    {
      label: "Opulence",
      value: "Opulence",
      desc: Opulence.src,
      heading: "Discover Luxury in Every Detail",
      content:
        "The Opulence collection redefines elegance with its luxurious designs and high-quality materials. Each wardrobe is meticulously crafted to provide not only ample storage but also a statement piece that enhances your home’s aesthetic. Experience the perfect blend of style and functionality with our opulent solutions.",
    },
    {
      label: "NexGen",
      value: "NexGen",
      desc: NexGen.src,
      heading: "Embrace the Future of Furniture",
      content:
        "NexGen wardrobes offer cutting-edge designs tailored for modern living. Featuring smart technology and innovative materials, this collection prioritizes convenience without compromising on style. Elevate your space with versatile storage solutions that adapt to your lifestyle and needs.",
    },
    {
      label: "SmartSpace",
      value: "SmartSpace",
      desc: SmartSpace.src,
      heading: "Maximize Efficiency with Intelligent Design",
      content:
        "SmartSpace wardrobes are engineered to optimize storage while maintaining a sleek appearance. Designed for urban living, these modular units help you utilize every inch of available space efficiently. Experience the harmony of form and function with our intelligent wardrobe solutions.",
    },
    {
      label: "StyleShift",
      value: "StyleShift",
      desc: StyleShift.src,
      heading: "Transform Your Space with Versatile",
      content:
        "The StyleShift collection embodies adaptability, allowing you to personalize your wardrobe to suit your evolving tastes. With a range of styles and configurations, these wardrobes ensure that your storage solutions can shift and grow with you, making them perfect for any home environment.",
    },
    {
      label: "Sovereign",
      value: "Sovereign",
      desc: StyleShift.src,
      heading: "Experience Regal Storage Solutions",
      content:
        "Sovereign wardrobes bring a touch of royalty to your living space. Crafted with premium materials and intricate detailing, these wardrobes offer a sophisticated storage solution that reflects your refined taste. Enjoy a perfect balance of grandeur and practicality with Sovereign.",
    },
    {
      label: "Ornet",
      value: "Ornet",
      desc: Ornet.src,
      heading: "Sustainable Elegance for Modern Living",
      content:
        "The Ornet collection focuses on eco-friendly materials and sustainable practices without sacrificing style. These wardrobes are designed for the environmentally conscious consumer, combining modern aesthetics with responsible craftsmanship. Elevate your home while making a positive impact on the planet with Ornet.",
    },
  ];

  return (
    <>
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 md:py-16">
        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
          <h2 className="max-w-lg mb-3 md:mb-6 font-sans text-2xl md:text-3xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
            We Believe You Are Unique
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Why settle for furniture that is made for someone else? With
            aesthetic designs, premium materials, and skilled artisanship, our
            team is committed to improving your shopping experience.
          </p>
        </div>
      </div>
      <div className="px-5 pb-14 md:px-5 w-full lg:px-10 xl:px-36">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none overflow-auto border-b border-blue-gray-50 bg-whie p-0"
            indicatorProps={{
              className:
                "bg-white border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`z-10  ${
                  activeTab === value ? "bg-white text-gray-900" : ""
                }`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, label, desc, content, heading }) => (
              <TabPanel
                key={desc}
                value={value}
                className="px-0 pt-3 pb-0 h-[400px] lg:h-[500px] xl:h-[600px]"
              >
                <div className="relative h-full">
                  <img
                    src={desc}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 grid w-full place-items-center bg-black/50 opacity-100 lg:opacity-0  transition-opacity duration-500 ease-in-out transform hover:opacity-100 hover:translate-y-0">
                    <div className="slide-up w-4/4 px-3 md:px-0 text-center lg:w-2/4 md:w-3/4 transform translate-y-4 transition-transform duration-500 ease-in-out">
                      <Typography
                        variant="h2"
                        color="white"
                        className="mb-4 text-lg md:text-2xl lg:text-3xl"
                      >
                        {heading}
                      </Typography>
                      <Typography
                        variant="lead"
                        color="white"
                        className="mb-5 lg:mb-12 text-base md:text-lg lg:text-xl opacity-90"
                      >
                        {content}
                      </Typography>
                      <div className="flex justify-center gap-2">
                        <Link href={`/collection/${label.toLocaleLowerCase()}`}>
                          {/* <Button
                            className={`lg:px-7 lg:text-sm lg:py-3 text-xs px-4 py-2 `}
                            color="white"
                          >
                            Explore
                          </Button> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
};

export default CategoriesTabs;
