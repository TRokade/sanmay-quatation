import React from "react";

const VisionandMission = () => {
  return (
    <section className="bg-gray-100 px-0 xl:px-24 dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 md:py-0">
          <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
            <h2 className="max-w-lg mb-3 md:mb-6 font-sans text-2xl md:text-3xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
              Our Vision & Mission
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              At Warsto, we are driven by a core set of values that shape our
              approach to business and customer service
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 py-10 mt-8  lg:grid-cols-2 ">
          <div className="space-y-3 group transition-all transform duration-500 hover:scale-105 bg-white hover:bg-[#ef4665] rounded-lg py-12 px-5">
            <span className="inline-block p-3 text-white bg-[#ef4665] group-hover:bg-white group-hover:text-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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

            <h1 className="text-xl font-semibold text-black group-hover:text-white capitalize dark:text-white">
              Vision
            </h1>

            <p className="text-black leading-6 group-hover:text-white dark:text-gray-300">
              Warsto’s vision is to fulfill all modular furniture needs within
              the customer’s budget, while delivering a premium quality product
              and experience. We believe in making luxury modular furniture
              accessible to everyone without compromising on quality, style, or
              convenience. Every customer deserves a personalized solution that
              enhances their space, all within their financial reach.
            </p>
          </div>

          <div className="space-y-3 group transition-all transform duration-500 hover:scale-105 bg-white hover:bg-[#ef4665] rounded-lg py-12 px-5">
            <span className="inline-block p-3 text-white bg-[#ef4665] group-hover:bg-white group-hover:text-[#ef4665] rounded-full dark:text-white dark:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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

            <h1 className="text-xl font-semibold text-black group-hover:text-white capitalize dark:text-white">
              Mission
            </h1>

            <p className="text-black group-hover:text-white dark:text-gray-300">
              Our mission at Warsto is to revolutionize the modular furniture
              industry by providing cutting-edge, personalized solutions that
              blend technology and design excellence. We aim to enhance the
              living and working spaces of our customers by offering functional,
              aesthetically pleasing, and cost-effective modular furniture that
              adapts to their evolving needs. Through innovation,
              customer-centric service, and sustainability, we strive to become
              the go-to brand for modular wardrobes and storage solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionandMission;
