import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black lg:py-0 w-full px-8 py-12 text-white">
      <div className="flex flex-col h-full lg:h-80 justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 max-w-screen-lg w-full">
          <div className="w-full mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">About Warsto</h3>
            <p className="text-gray-400 text-sm">
              Stylish furniture solutions for your home.
            </p>
          </div>
          {/* <div className="w-full mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 text-sm">
              <li className="mb-2">
                <Link href="#" className="hover:text-white">
                  Living Room
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-white">
                  Dining & Kitchen
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-white">
                  Bedroom
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-white">
                  Pillows & Decor
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-white">
                  Warsto B2B
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="w-full mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="text-gray-400 text-sm">
              <li className="mb-2">
                <Link href="/about" className="hover:text-white">
                  About us
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61566134657577"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaFacebook />
              </Link>

              {/* <Link
                href="https://www.linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaLinkedin />
              </Link> */}

              <Link
                href="https://www.instagram.com/warsto_ind/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
