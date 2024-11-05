"use client";
import React, { useEffect, useState } from "react";
import Warsto from "../public/images/warsto.png";
import HomeIcon from "@mui/icons-material/Home";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import InfoIcon from "@mui/icons-material/Info";

import { CiMenuFries } from "react-icons/ci";
import {
  Menu,
  MenuHandler,
  Button,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Appbar = () => {
  //   const location = useLocation();
  const navigate = useRouter();
  const location = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [Reqvalue, setvalue] = useState("flex");

  const scrollThreshold = 10;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
      setActiveLink(location);
  }, [location]);

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div
        className={`drop-shadow-md fixed top-0 w-full bg-white z-20 transition-transform duration-300 ${
          showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        {/* <div
          className={`${Reqvalue} lg:text-sm text-xs items-center justify-center bg-black text-white py-3`}
        >
          Request Your Free Appointment With Our Design Experts
          <RxCross2 className="ms-10" onClick={() => setvalue("hidden")} />
        </div> */}
        <div className="flex flex-row justify-around lg:px-5 lg:justify-center items-center">
          <Link href={"/"}>
            <div className="p-4 text-lg lg:w-48 w-32 lg:me-5 sm:me-0">
              <Image src={Warsto} alt="warSto" />
            </div>
          </Link>
          <div className="p-4  me-0 md:mx-5 md:w-[500px] xxs:px-0 transition-all duration-300"></div>
          <div className="hidden xl:flex justify-center">
            <ul className="xl:flex mx-14 justify-center font-medium text-sm">
              <Link
                href={"/"}
                className={`nav-link-ltr nav-link ${
                  activeLink === "/" ? "active" : ""
                }`}
              >
                <li className="items-center flex flex-row">
                  <HomeIcon className="me-2" />
                  Home
                </li>
              </Link>
              <Link
                href={"/contact-us"}
                className={`nav-link-ltr nav-link ${
                  activeLink === "/contact-us" ? "active" : ""
                }`}
              >
                <li className="flex items-center flex-row">
                  <PermPhoneMsgIcon className="me-2" />
                  Contact
                </li>
              </Link>
              <Link
                href={"/about"}
                className={`nav-link-ltr nav-link ${
                  activeLink === "/about" ? "active" : ""
                }`}
              >
                <li className="flex items-center flex-row">
                  <InfoIcon className="me-2" />
                  About
                </li>
              </Link>
            </ul>
          </div>

          <div className="py-4 px-2 me-0 flex items-center">
           {location !== "/get-estimate" && (
            <Link href={"/get-estimate"}>
              <Button
                className="text-xs md:text-sm ms-5 whitespace-nowrap text-white bg-[#ef4665]"
                radius="sm"
              >
                Get Estimate
              </Button>
            </Link>)} 
            <CiMenuFries
              onClick={openDrawer}
              className="text-xl block xl:hidden  xxs:ms-2"
            />
          </div>
        </div>
      </div>

      <Drawer
        placement="right"
        open={open}
        overlay={false}
        onClose={closeDrawer}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <ListItem
            onClick={() => {
              navigate.push("/home");
              setOpen(false);
            }}
          >
            Home
          </ListItem>

          <ListItem
            onClick={() => {
              navigate.push("/about");
              setOpen(false);
            }}
          >
            About
          </ListItem>
          <ListItem
            onClick={() => {
              navigate.push("contact-us");
              setOpen(false);
            }}
          >
            Contact
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Appbar;
