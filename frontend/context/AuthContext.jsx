"use client";
import { usePathname } from "next/navigation";
import { uuid } from "uuidv4";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useMediaQuery } from "@mui/material";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

import { Dialog } from "@material-tailwind/react";
import SignIn from "@/app/(auth)/signin/page";
import SignUp from "@/app/(auth)/signup/page";
import { Height } from "@mui/icons-material";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const location = usePathname();

  const [openCart, setCartOpen] = useState(false);
  const [openFilter, setFilterOpen] = useState(false);

  const [loginopen, setLoginopen] = useState(false);
  const handleOpen = () => setLoginopen((cur) => !cur);

  const [currentUser, setCurrentUser] = useState(null);
  const [guestUser, setguestUser] = useState(null);

  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  let buttonSize = "sm";
  if (isTablet) {
    buttonSize = "sm";
  } else if (isMobile) {
    buttonSize = "xs";
  }

  useEffect(() => {
    const user = localStorage.getItem("token");
    const guestID = localStorage.getItem("guestID");
    if (user) {
      setCurrentUser(user);
    } else if (guestID) {
      setguestUser(guestID);
    }
  }, []);

  const data = [
    {
      label: "Sign In",
      value: "Login",
      desc: <SignIn />,
    },
    {
      label: "Sign Up",
      value: "Sign Up",
      desc: <SignUp />,
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "White",
    Height: 300,
  };

  // const LoginDial = () => {
  //   return (
  //     <Modal
  //       open={loginopen}
  //       onClose={handleOpen}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //       disableScrollLock
  //       slotProps={{
  //         backdrop: {
  //           style: { backgroundColor: 'transparent' },
  //         },
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           ...style,
  //           height: "500px",
  //         }}
  //         className="w-[300px] md:w-[500px]"
  //       >
  //         <div className="bg-white rounded-md">
  //           <Tabs value="Login">
  //             <TabsHeader>
  //               {data.map(({ label, value }) => (
  //                 <Tab key={value} className="py-2" value={value}>
  //                   <div className="flex items-center gap-2">{label}</div>
  //                 </Tab>
  //               ))}
  //             </TabsHeader>
  //             <TabsBody
  //               animate={{
  //                 initial: { y: 250 },
  //                 mount: { y: 0 },
  //                 unmount: { y: 250 },
  //               }}
  //               className="p-0"
  //             >
  //               {data.map(({ value, desc }) => (
  //                 <TabPanel className="p-0 px-2" key={value} value={value}>
  //                   {desc}
  //                 </TabPanel>
  //               ))}
  //             </TabsBody>
  //           </Tabs>
  //         </div>
  //       </Box>
  //     </Modal>
  //   );
  // };

  const LoginDial = () => {
    return (
      <Dialog
        size={buttonSize}
        overlay={false}
        open={loginopen}
        handler={handleOpen}
        className="border-none !bg-transparent max-h-[200px]  rounded-md"
      >
        <div className="bg-white rounded-md">
          <Tabs value="Login">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} className="py-2" value={value}>
                  <div className="flex items-center gap-2">{label}</div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
              className="p-0"
            >
              {data.map(({ value, desc }) => (
                <TabPanel className="p-0 lg:px-2" key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </Dialog>
    );
  };

  const openCartDrawer = () => {
    if (location !== "/cart") {
      setCartOpen(true);
    }
  };
  const closeCartDrawer = () => setCartOpen(false);

  const openFilterDrawer = () => setFilterOpen(true);
  const closeFilterDrawer = () => setFilterOpen(false);

  // navbar scroll

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [Reqvalue, setvalue] = useState("flex");

  const scrollThreshold = 30;

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

  const value = {
    openCart,
    openFilter,
    openCartDrawer,
    currentUser,
    setCurrentUser,
    guestUser,
    showNavbar,
    Reqvalue,
    handleOpen,
    loginopen,
    LoginDial,
    setvalue,
    openFilterDrawer,
    closeFilterDrawer,
    closeCartDrawer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
