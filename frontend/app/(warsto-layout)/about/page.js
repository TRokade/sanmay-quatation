import React from "react";
import about1 from "@/public/images/about1.jpg"
import about2 from "@/public/images/about2.webp"
import about3 from "@/public/images/about3.webp"
import about4 from "@/public/images/about4.webp"

const AboutUs = () => {
  return (
    <>
      <div className="mt-28  md:mt-40 mb-0 text-center">
        {/* <h3 className="mb-5 text-3xl font-medium">About us</h3> */}
      </div>
      <div className="flex flex-col pb-0 md:pb-28 md:flex-row lg:flex-row  justify-center px-5 lg:px-10 xl:px-40">
        <div
          className="relative h-[350px] lg:h-[500px] w-full bg-local lg:bg-fixed  bg-cover lg:bg-contain md:bg-contain bg-no-repeat lg:bg-no-repeat	"
          style={{
            backgroundImage:
              `url(${about1.src})`,
          }}
        ></div>
        <div className="w-full">
          <div className="px-5 py-10 lg:px-20 lg:py-20 ">
            <h2 className="mb-4 text-xl text-black md:text-2xl lg:text-3xl">
              Innovative Modular Furniture
            </h2>
            <p className="mb-4 text-black text-base md:text-sm lg:text-base opacity-80">
              Warsto is a tech-driven modular furniture company specializing in
              high-quality modular wardrobes and storage solutions. Our focus is
              on delivering products that combine exceptional precision with
              superior craftsmanship, ensuring that every piece is not only
              functional but also a statement of style and innovation. At
              Warsto, we prioritize top-notch quality, using only the finest
              materials and state-of-the-art technology to manufacture furniture
              that stands the test of time.
            </p>
            {/* <div className="flex gap-2">
              <Button size="lg" color="white">
                Shop Now
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse pb-0 md:pb-28 md:flex-row lg:flex-row  justify-center px-5 lg:px-10 xl:px-40">
        <div className="w-full">
          <div className="px-5 py-10 lg:px-10 lg:py-20 ">
            <h2 className="mb-4 text-xl text-black md:text-2xl lg:text-3xl">
              Fast, Personalized Solutions
            </h2>
            <p className="mb-4 text-black text-base md:text-sm lg:text-base opacity-80">
              Our solutions are designed with meticulous attention to detail,
              offering seamless integration into your home or workspace, and are
              fully personalized & customizable to meet your specific needs. We
              are committed to providing the fastest delivery in the market,
              ensuring your personalized-made wardrobes and storage units arrive
              quickly and efficiently. Our hassle-free experience guarantees
              minimal disruption to your routine, with easy installation and a
              customer-centric approach from start to finish.
            </p>
            {/* <div className="flex gap-2">
              <Button size="lg" color="white">
                Shop Now
              </Button>
            </div> */}
          </div>
        </div>
        <div
          className="relative h-[350px] lg:h-[500px] bg-local lg:bg-fixed w-full bg-cover lg:bg-contain md:bg-contain bg-no-repeat lg:bg-repeat"
          style={{
            backgroundImage:
              `url(${about2.src})`,
          }}
        ></div>
      </div>

      <div className="flex flex-col pb-0 md:pb-28 md:flex-row lg:flex-row  justify-center px-5 lg:px-10 xl:px-40">
        <div
          className="relative h-[350px] lg:h-[500px] bg-local lg:bg-fixed w-full bg-cover lg:bg-contain md:bg-contain bg-no-repeat lg:bg-repeat"
          style={{
            backgroundImage:
              `url(${about3.src})`,
          }}
        ></div>
        <div className="w-full">
          <div className="px-5 py-10 lg:px-20 lg:py-20 ">
            <h2 className="mb-4 text-xl text-black md:text-2xl lg:text-3xl">
              Seamless Online Experience
            </h2>
            <p className="mb-4 text-black text-base md:text-sm lg:text-base opacity-80">
              Warsto is the first brand to sell modular furniture entirely
              online through an e-commerce platform, setting us apart from
              traditional methods. Unlike other brands that take 2-3 days just
              to provide a quotation, Warsto offers instant pricing and a fully
              digital experience, allowing customers to select and personalize
              their modular furniture from the comfort of their homes, without
              unnecessary delays. Our streamlined process ensures a faster, more
              convenient way to furnish your space.
            </p>
            {/* <div className="flex gap-2">
              <Button size="lg" color="white">
                Shop Now
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row lg:flex-row  justify-center px-5 lg:px-10 xl:px-40">
        <div className="w-full">
          <div className="px-5 py-10 lg:px-10 lg:py-20 ">
            <h2 className="mb-4 text-xl text-black md:text-2xl lg:text-3xl">
              Maximizing Space Efficiency
            </h2>
            <p className="mb-4 text-black text-base md:text-sm lg:text-base opacity-80">
              In addition, all Warsto products are tailor-fitted to maximize
              storage capacity, leaving no wasted space or gaps once installed.
              Our personalized-designed modular furniture ensures an efficient
              and seamless fit in any room, helping customers fully utilize
              every inch of their available space. With Warsto, you get more
              than just furniture—you get a seamless experience, unmatched
              quality, and modern solutions tailored to your space.
            </p>
            {/* <div className="flex gap-2">
              <Button size="lg" color="white">
                Shop Now
              </Button>
            </div> */}
          </div>
        </div>
        <div
          className="relative h-[350px] lg:h-[500px] bg-local lg:bg-fixed w-full bg-cover lg:bg-contain md:bg-contain bg-no-repeat lg:bg-repeat "
          style={{
            backgroundImage:
              `url(${about4.src})`,
          }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-5 lg:grid-cols-4 lg:my-20 my-0 text-center ">
        <div className="flex flex-col my-5 lg:my-0 justify-center  items-center">
          <div className="my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="63.355"
              height="52.246"
              viewBox="0 0 63.355 52.246"
            >
              <g
                id="Group_27158"
                data-name="Group 27158"
                transform="translate(-1535.706 -101.608)"
              >
                <path
                  id="Path_40878"
                  data-name="Path 40878"
                  d="M1557.727,111.819h35.127a5.223,5.223,0,0,1,5.457,4.917v31.445a5.223,5.223,0,0,1-5.457,4.917h-50.94a5.224,5.224,0,0,1-5.458-4.917V116.736a5.224,5.224,0,0,1,5.458-4.917h3.758"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <g id="Group_27158-2" data-name="Group 27158">
                  <path
                    id="Path_40879"
                    data-name="Path 40879"
                    d="M1560.873,119.977l-13.831-17.055c-.514-.633-1.689-.538-2.613.211h0c-.923.749-1.258,1.879-.745,2.512l13.832,17.055,2.467.109a.519.519,0,0,0,.487-.4Z"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></path>
                  <line
                    id="Line_1519"
                    data-name="Line 1519"
                    y1="2.723"
                    x2="3.358"
                    transform="translate(1545.191 104.781)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></line>
                </g>
                <line
                  id="Line_1520"
                  data-name="Line 1520"
                  x1="0.368"
                  y2="41.095"
                  transform="translate(1543.443 112.003)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></line>
                <line
                  id="Line_1521"
                  data-name="Line 1521"
                  y2="4"
                  transform="translate(1539.292 130.377)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></line>
                <path
                  id="Path_40880"
                  data-name="Path 40880"
                  d="M1557.313,128.571a27.481,27.481,0,0,1,13.936-3.726,27.761,27.761,0,0,1,14.24,3.9"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40881"
                  data-name="Path 40881"
                  d="M1590.774,133.919v13.869h-40.029V133.919a2.585,2.585,0,0,1,3.223-2.9s5.783.109,5.28,7.338c0,0-.629,2.515,2.515,2.326l18.922-.063s1.32,0,1.508-1.76c0,0-.88-6.441,3.835-7.841C1586.028,131.02,1590.774,129.857,1590.774,133.919Z"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40882"
                  data-name="Path 40882"
                  d="M1559.4,139.532a3.321,3.321,0,0,1,3.311-3.311h4.493a3.321,3.321,0,0,1,3.311,3.311v1.178"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40883"
                  data-name="Path 40883"
                  d="M1582.157,139.532a3.4,3.4,0,0,0-3.468-3.311h-4.706a3.4,3.4,0,0,0-3.467,3.311v1.178"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
              </g>
            </svg>
          </div>
          <h2 className="text-large font-bold">Good Design</h2>
          <p>
            Designs that speak of <br /> aesthetics and functionality!
          </p>
        </div>
        <div className="flex flex-col my-5 lg:my-0 justify-center items-center">
          <div className="my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46.742"
              height="56.914"
              viewBox="0 0 46.742 56.914"
            >
              <g
                id="Group_27155"
                data-name="Group 27155"
                transform="translate(-941.811 -573.75)"
              >
                <path
                  id="Path_40869"
                  data-name="Path 40869"
                  d="M980.531,629.915V610.4l.047-.09a20.053,20.053,0,0,0,7.225-15.517,20.28,20.28,0,1,0-40.377,2.7l-4.611,8.759a2,2,0,0,0,1.773,2.934h2.654V615.1a7.5,7.5,0,0,0,7.48,7.48h7.115c.174,0,.346-.006.517-.018v7.35"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40870"
                  data-name="Path 40870"
                  d="M974.6,593.332l-1.481,1.481-6.471,6.482a.06.06,0,0,1-.084,0l-8.158-8.158a4.609,4.609,0,0,1,6.523-6.513l1.635,1.635a.06.06,0,0,0,.084,0l1.635-1.635a4.618,4.618,0,0,1,6.327-.174A4.788,4.788,0,0,1,974.6,593.332Z"
                  transform="translate(1.082 0.805)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
              </g>
            </svg>
          </div>
          <h2 className="text-large font-bold">Good For You</h2>
          <p>
            Every shipment is insured, every <br /> payment is secure with us!
          </p>
        </div>
        <div className="flex flex-col my-5 lg:my-0 justify-center items-center">
          <div className="my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="63.12"
              height="37.066"
              viewBox="0 0 63.12 37.066"
            >
              <g
                id="Group_27159"
                data-name="Group 27159"
                transform="translate(-1775.473 -234.096)"
              >
                <circle
                  id="Ellipse_114856"
                  data-name="Ellipse 114856"
                  cx="7.49"
                  cy="7.49"
                  r="7.49"
                  transform="translate(1780.346 234.792)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.392"
                ></circle>
                <circle
                  id="Ellipse_114856-2"
                  data-name="Ellipse 114856"
                  cx="7.49"
                  cy="7.49"
                  r="7.49"
                  transform="translate(1799.489 241.763)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.392"
                ></circle>
                <circle
                  id="Ellipse_114856-3"
                  data-name="Ellipse 114856"
                  cx="7.49"
                  cy="7.49"
                  r="7.49"
                  transform="translate(1818.738 234.792)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.392"
                ></circle>
                <path
                  id="Path_40866"
                  data-name="Path 40866"
                  d="M1776.223,264.443v-1.956a11.73,11.73,0,0,1,11.7-11.7h0a11.742,11.742,0,0,1,11.457,9.346c.027.132.052.264.075.4"
                  transform="translate(0 -1.019)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40867"
                  data-name="Path 40867"
                  d="M1840.454,264.443v-1.956a11.731,11.731,0,0,0-11.7-11.7h0a11.741,11.741,0,0,0-11.457,9.346c-.027.132-.053.264-.076.4"
                  transform="translate(-2.611 -1.019)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40868"
                  data-name="Path 40868"
                  d="M1796.581,271.9v-1.956a11.729,11.729,0,0,1,11.7-11.7h0a11.73,11.73,0,0,1,11.7,11.7v1.966"
                  transform="translate(-1.296 -1.494)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </g>
            </svg>
          </div>
          <h2 className="text-large font-bold">Good For People</h2>
          <p>
            We are here listening to your
            <br /> custom needs or any other <br />
            requirements!
          </p>
        </div>
        <div className="flex flex-col my-5 lg:my-0 justify-center items-center">
          <div className="my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56.913"
              height="55.292"
              viewBox="0 0 56.913 55.292"
            >
              <g
                id="Group_27156"
                data-name="Group 27156"
                transform="translate(-934.876 -594.816)"
              >
                <circle
                  id="Ellipse_114859"
                  data-name="Ellipse 114859"
                  cx="17.344"
                  cy="17.344"
                  r="17.344"
                  transform="translate(946.048 595.566)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></circle>
                <path
                  id="Path_40871"
                  data-name="Path 40871"
                  d="M948.319,603.281a4.172,4.172,0,0,1,2.2,3.091c.174,2.09,5.483,7.05,5.483,7.05s2.177,1.306,1.828-1.219,1.741-1.74,1.741-1.74,4.179-5.31,5.484-5.484.087-2.7-1.394-3.134-2.317-.435-3.117.7-3.846-.87-2.715-2.176,3.743-1.566,4.962-1.479.783-1.654,1.566-1.741,2.351,2.785,2.351,2.785.349,1.828,1.915.609,3.264-2.473,3.264-2.473"
                  transform="translate(0.596 0.074)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40872"
                  data-name="Path 40872"
                  d="M977.344,605.079h-1.682s-1.393.137-1.132,3.01a3.1,3.1,0,0,1-.87,2.089s-2.7,3.307,1.219,5.222c0,0,2.848-.148,3.773.492"
                  transform="translate(1.745 0.447)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <path
                  id="Path_40873"
                  data-name="Path 40873"
                  d="M962.258,629.418s-2.176-1.351-.783-5.354c0,0,.7-2.96.783-3.917,0,0-1.622-1.741-2.247-2.264,0,0-1.322-4.526,2.247-4.526,0,0,2.264.349,2.611.958a3.812,3.812,0,0,0,1.567,1.741,10.027,10.027,0,0,1,1.827.521c.871.436,1.915.871,1.654,1.567s.087,1.393-.522,2.263-.261,1.219-1.393,1.523a6.866,6.866,0,0,0-3.569,3.7c-.87,1.915-1.175,1.307-1.044,2.524A1.128,1.128,0,0,1,962.258,629.418Z"
                  transform="translate(1.135 0.836)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
                <g
                  id="Group_27156-2"
                  data-name="Group 27156"
                  transform="translate(935.626 615.412)"
                >
                  <path
                    id="Path_40874"
                    data-name="Path 40874"
                    d="M937.954,640.376"
                    transform="translate(-935.517 -613.306)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    id="Path_40875"
                    data-name="Path 40875"
                    d="M940.5,628.666V616.958a2.444,2.444,0,0,0-2.436-2.437h0a2.444,2.444,0,0,0-2.437,2.437v14.71c0,.218,9.835,10.314,9.835,10.314v6.485h9.748V637.339a2.165,2.165,0,0,0-.652-1.447l-9.842-10.543a2.445,2.445,0,0,0-3.445-.118h0a2.428,2.428,0,0,0-.77,1.7Z"
                    transform="translate(-935.626 -614.521)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></path>
                  <line
                    id="Line_1517"
                    data-name="Line 1517"
                    x2="6.767"
                    y2="6.528"
                    transform="translate(4.722 13.731)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></line>
                </g>
                <g
                  id="Group_27157"
                  data-name="Group 27157"
                  transform="translate(971.454 615.412)"
                >
                  <path
                    id="Path_40876"
                    data-name="Path 40876"
                    d="M986.224,640.376"
                    transform="translate(-969.076 -613.306)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    id="Path_40877"
                    data-name="Path 40877"
                    d="M984.556,628.666V616.958a2.445,2.445,0,0,1,2.437-2.437h0a2.445,2.445,0,0,1,2.437,2.437v14.71c0,.218-9.837,10.314-9.837,10.314v6.485h-9.748V637.339a2.174,2.174,0,0,1,.652-1.447l9.843-10.543a2.445,2.445,0,0,1,3.445-.118h0a2.437,2.437,0,0,1,.77,1.7Z"
                    transform="translate(-969.846 -614.521)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></path>
                  <line
                    id="Line_1518"
                    data-name="Line 1518"
                    x1="6.767"
                    y2="6.528"
                    transform="translate(8.095 13.731)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></line>
                </g>
              </g>
            </svg>
          </div>
          <h2 className="text-large font-bold">Good For Planet </h2>
          <p>
            Keeping in mind all regulations <br /> that benefits all.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
