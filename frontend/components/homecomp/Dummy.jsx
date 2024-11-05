"use client";
import Image from "next/image";
import React from "react";
import wardrobeImg from "@/public/images/ourvaluewardrobe.jpeg";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const Dummy = () => {
  return (
    <>
      <section className="bg-white px-0 xl:px-24 dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
            <h2 className="max-w-lg mb-6 font-sans text-2xl md:text-3xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
              Our Values
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              At Warsto, we are driven by a core set of values that shape our
              approach to business and customer service
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 py-10 mt-2 md:mt-8 xl:mt-12 xl:gap-16 lg:grid-cols-2 ">
            <div>
              <div className="space-y-3  mb-4 flex  items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Quality First
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    We never compromise on the quality of our products, ensuring
                    they are durable, stylish, and of the highest standard.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4 flex items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Customer Centricity:
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    Every decision we make is centered around delivering the
                    best experience for our customers, from product design to
                    delivery.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4 flex items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Innovation
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    We continuously push the boundaries of design and
                    technology, creating furniture that is not only functional
                    but forward-thinking.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4 flex items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Sustainability:
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    We are committed to eco-friendly practices, using
                    sustainable materials and processes to minimize our
                    environmental impact.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4 flex items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Integrity
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    We operate with honesty and transparency, ensuring that our
                    customers always receive what is promised.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4 flex items-center">
                <span className="inline-block p-3 text-white me-4 transition-all transform duration-500 hover:scale-125 bg-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-medium md:text-xl font-semibold text-black capitalize dark:text-white">
                    Efficiency
                  </h1>

                  <p className="text-black text-sm md:text-base dark:text-gray-300">
                    We strive to offer the fastest delivery and a hassle-free
                    experience, with a focus on precision and attention to
                    detail.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={wardrobeImg}
                className="w-96 lg:w-auto"
                alt="Wardrobe and storage"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dummy;
