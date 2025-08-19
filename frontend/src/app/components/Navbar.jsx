"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import Cookies from "js-cookie";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { DialogTitle, DialogDescription } from "./ui/dialog";
import { LogOut, Menu, Pointer } from "lucide-react";
import { Button } from "./ui/button";
// import {
//   useVisitorGoogleLoginMutation,
//   useVisitorLoginMutation,
//   useVisitorSignUpMutation,
// } from "@/app/redux/slices/visitorSlice/VisitorAuth";
import toast from "react-hot-toast";
// import {
//   useGetOtpMutation,
//   useGetOtpQuery,
// } from "@/app/redux/slices/getOtp/GetOtp";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter, usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import { getVisitorById, visitorGoogleLogin, visitorLogin, visitorSignUp } from "@/app/redux/slices/visitorSlice/VisitorAuth";
import { getOtp } from "@/app/redux/slices/getOtp/GetOtp";
import { useDispatch, useSelector } from "react-redux";
import useHandleLogout from "@/utils/logoutHandler";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); NavigationMenuTrigger
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/architect");;
  const visitor = useSelector(state => state.visitor.visitorInfo)
  // console.log(visitor,"-------------------------------");

  // navbar scroll hide code 
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const state = useSelector(state => state)
  // console.log(state);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShow(false); // Hide on scroll down
          } else {
            setShow(true); // Show on scroll up
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };
    NavigationMenuTrigger
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false);
  const [form, setform] = React.useState({ email: "", password: "" });
  const [SignUpForm, setSignUpForm] = React.useState({
    fullname: "",
    phone_number: 111111111111,
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = React.useState(false);
  const [VerfiyOtp, setVerfiyOtp] = React.useState();
  const [VisitorData, setVisitorData] = React.useState();
  const [otp, setOtp] = React.useState();


  const fetchVisitors = async () => {
    try {
      const res = await dispatch(getVisitorById());
      // console.log(res, "Visitor Data");
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(visitorLogin(form));
      console.log(result);

      // Check if login failed via rejectedWithValue
      if (result?.meta?.rejectedWithValue) {
        const errorMsg = result?.payload?.message || "Login failed.";
        toast.error(errorMsg);
        return;
      }

      // Check if login was successful
      if (result?.meta?.requestStatus === "fulfilled" && result?.payload?.message === "Login successful") {
        toast.success(result.payload.message);
        fetchVisitors()
        const email = Cookies.get("email");
        const name = Cookies.get("fullname");
        const token = Cookies.get("token");

        if (email && name) {

          setVisitorData({ name, email, token });
        } else {
          setVisitorData(null);
        }

        setShowModal(false);
      } else {
        // Catch any unexpected case
        toast.error("Unexpected login response.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed due to a server error.");
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const userOtp = VerfiyOtp?.verifiyOtp?.toString();

      if (!otp || !userOtp) {
        toast.error("OTP is missing or invalid.");
        return;
      }

      const decodedHash = decodeURIComponent(otp);
      const isMatch = await bcrypt.compare(userOtp, decodedHash);
      console.log("OTP match:", isMatch);

      if (!isMatch) {
        toast.error("Invalid OTP");
        return;
      }

      const { fullname, phone_number, email, password } = SignUpForm;

      if (!fullname || !phone_number || !email || !password) {
        toast.error("Please fill all the required fields.");
        return;
      }

      const result = await dispatch(visitorSignUp(SignUpForm));
      if (result?.meta?.rejectedWithValue) {
        const errorMsg = result?.payload?.message || "Signup failed.";
        toast.error(errorMsg);
        return;
      }

      // Handle success
      if (result?.payload?.message === "Signup successful") {
        toast.success(result?.payload?.message);
        setShowModal(false);
        fetchVisitors()
        const email = Cookies.get("email");
        const name = Cookies.get("fullname");
        const token = Cookies.get("token");

        if (email && name && token) {
          setVisitorData({ name, email, token });
        } else {
          setVisitorData(null);
        }
      }

    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed.");
    }
  };


  const verifiyOtp = async () => {
    try {
      if (!SignUpForm.email || SignUpForm.email.trim() === "") {
        toast.error("Email is required");
        return;
      }

      await toast.promise(
        dispatch(getOtp(SignUpForm.email)),
        {
          loading: "Sending OTP...",
          success: (res) => {
            setOtp(res?.payload?.hashedOtp);
            return res?.payload?.message || "OTP sent successfully!";
          },
          error: (err) => {
            console.error(err);
            return err?.data?.message || "Failed to send OTP";
          },
        }
      );
    } catch (error) {
      console.log(error?.message || "Unknown error");
    }
  };


  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );
      const googleUserData = {
        email: decoded.email,
        name: `${decoded.given_name} ${decoded.family_name}`,
        password: decoded.sub,
      };
      // console.log(googleUserData);
      const result = await dispatch(visitorGoogleLogin(googleUserData));
      if (result?.message === "Login successful") {
        const email = result.visitor.email;
        const name = result.visitor.name;
        if (email && name) {
          setVisitorData({ name, email });
        } else {
          setVisitorData(null);
        }
        setShowModal(false);
        console.log(VisitorData, "||||||||||||||||||||||||||||||||||||||||||||||||||||||");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogout = () => {
  //   const confirmLogout = window.confirm("Are you sure you want to logout?");

  //   if (!confirmLogout) return;

  //   Cookies.remove("visitorToken");
  //   setVisitorData(null);
  //   toast.success("Logged out successfully");
  //   window.location.href = "/";
  // };

  const handleLogout = useHandleLogout();
  // fetchVisitors();



  return (
    <nav
      style={{ borderBottom: "1px solid rgba(179, 119, 54, 0.16)" }}
      // className=" w-full px-4 py-3 sticky top-0 z-50 backdrop-blur-md bg-[#ffffffa8]"

      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out 
        ${isAdminPage ? "hidden" : show ? "translate-y-0" : "-translate-y-full"} 
        backdrop-blur-md bg-[#ffffffa8]`}
    >
      <div className="scale-container max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo/company-logo.webp"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <div className="hidden md:block items-center gap-6">
          <NavigationMenu className="hover:bg-transparent">
            <NavigationMenuList className="flex items-center gap-4 bg-transparent">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-transparent"
                >
                  <Link href="/" className="text-sm font-medium text-black">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Archive
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[300px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Listing
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[250px]">
                    <ListItem title="Components" href="#">
                      Browse all components in the library.
                    </ListItem>
                    <ListItem title="Documentation" href="#">
                      Learn how to use the library.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Others
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[250px]">
                    <ListItem title="Blocks" href="#">
                      Ready-made block sections.
                    </ListItem>
                    <ListItem title="Themes" href="#">
                      Switch between light & dark.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="bg-transparent hover:bg-transparent">
                {visitor?.fullname ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">
                      Hi, {visitor?.fullname}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleLogout("/")}
                            className="cursor-pointer ml-5 text-primary hover:text-red-500"
                          >
                            <LogOut className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Logout</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <Button
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md text-sm hover:bg-amber-950 transition"
                    onClick={() => setShowModal(true)}
                  >
                    Login / Sign Up
                  </Button>
                )}

                {/* Modal */}
                {showModal && (
                  <div
                    style={{ backgroundColor: "rgb(194 149 100 / 33%)" }}
                    className="fixed   inset-0 bg-opacity-50 flex items-center justify-center w-[100%] h-[115vh] z-50"
                  >
                    <div className=" bg-white flex items-center justify-center  rounded-[40px] shadow-xl   relative">
                      {/* login in form */}

                      {/* signup form */}
                      {isOpen ? (
                        <StyledWrapper>
                          <div className="container ">
                            <div className="heading">Sign In</div>
                            <form onSubmit={handleSubmit} className="form">
                              <input
                                onChange={(e) => {
                                  setform((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }));
                                }}
                                required
                                className="input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                              />
                              <input
                                onChange={(e) => {
                                  setform((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                  }));
                                }}
                                required
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                              />
                              <span className="forgot-password">
                                <a href="#">Forgot Password ?</a>
                              </span>
                              <input className="login-button" type="submit" />
                            </form>
                            <div className="social-account-container">
                              {/* <span className="title"></span> */}
                              <div className="social-accounts">
                                {/* <button className="social-button google">
                                  <svg
                                    viewBox="0 0 488 512"
                                    height="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="svg"
                                  >
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                  </svg>
                                </button> */}
                                <GoogleLogin
                                  onSuccess={handleGoogleLogin}
                                  onError={handleGoogleLogin}
                                  type="icon"
                                  theme="filled_black"
                                  size="large"
                                  shape="circle"
                                />
                              </div>
                            </div>
                            <span
                              className="agreement"
                              onClick={() => setIsOpen(false)}
                            >
                              <a>Create your account</a>
                            </span>
                            <Button
                              style={{
                                background:
                                  "linear-gradient(0deg, rgba(190, 142, 90, 0.16) 0%, rgba(190, 142, 90, 0.08) 100%)",
                                cursor: "pointer",
                                fontWeight: "bold",
                                borderRadius: "60%",
                                marginTop: "10px",
                                width: "30px",
                                height: "30px",
                              }}
                              onClick={() => setShowModal(false)}
                              className="top-[10px] right-[20px] absolute"
                            >
                              X
                            </Button>
                          </div>
                        </StyledWrapper>
                      ) : (
                        <StyledWrapper>
                          <div className="container">
                            <div className="heading">Sign Up</div>
                            <form onSubmit={handleSubmit1} className="form">
                              <div className="flex gap-4">
                                <input
                                  onChange={(e) =>
                                    setSignUpForm((prev) => ({
                                      ...prev,
                                      fullname: e.target.value,
                                    }))
                                  }
                                  required
                                  className="input flex-1"
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="Full Name"
                                />
                                <input
                                  onChange={(e) =>
                                    setSignUpForm((prev) => ({
                                      ...prev,
                                      phone_number: e.target.value,
                                    }))
                                  }
                                  required
                                  className="input flex-1"
                                  type="tel"
                                  name="phone"
                                  id="phone"
                                  placeholder="Phone Number"
                                />
                              </div>

                              <input
                                onChange={(e) =>
                                  setSignUpForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                required
                                className="input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                              />

                              <input
                                onChange={(e) =>
                                  setSignUpForm((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                  }))
                                }
                                required
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                              />

                              <div className="flex gap-4">
                                <input
                                  required
                                  className="input flex-1"
                                  type="number"
                                  name="otp"
                                  id="otp"
                                  onChange={(e) =>
                                    setVerfiyOtp((prev) => ({
                                      ...prev,
                                      verifiyOtp: e.target.value,
                                    }))
                                  }
                                  // onChange={()=>{setVerfiyOtp}}
                                  placeholder="Enter OTP"
                                  style={{ height: "60px" }}
                                />
                                <button
                                  type="button"
                                  // enable only when OTP input has value
                                  onClick={verifiyOtp}
                                  className="login-button flex-1"
                                >
                                  Get OTP
                                </button>
                              </div>

                              <span className="forgot-password">
                                <a href="#">Forgot Password?</a>
                              </span>
                              <button
                                disabled={!otp}
                                // onClick={handleClick}
                                className={`login-button flex items-center gap-2 ${!otp ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                              >
                                {!otp}
                                Submit
                              </button>

                              {/* <input className="login-button" disabled   type="submit" value="Submit" /> */}
                            </form>

                            <div className="social-account-container">
                              {/* social buttons if needed */}
                            </div>

                            <span
                              className="agreement"
                              onClick={() => setIsOpen(true)}
                            >
                              <a>Already Login</a>
                            </span>

                            <Button
                              style={{
                                background:
                                  "linear-gradient(0deg, rgba(190, 142, 90, 0.16) 0%, rgba(190, 142, 90, 0.08) 100%)",
                                cursor: "pointer",
                                fontWeight: "bold",
                                borderRadius: "60%",
                                marginTop: "10px",
                                width: "30px",
                                height: "30px",
                              }}
                              onClick={() => setShowModal(false)}
                              className="top-[10px] right-[20px] absolute"
                            >
                              X
                            </Button>
                          </div>
                        </StyledWrapper>
                      )}
                    </div>
                  </div>
                )}
                {/* // )} */}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden block ">
          {/* <Sheet open={isOpen} onOpenChange={setIsOpen}> */}
          <Sheet>
            <SheetTrigger className="p-2">
              <Menu className="h-6 w-6 text-gray-700" />
            </SheetTrigger>
            <SheetContent side="left" className="w-68">
              <DialogTitle className="sr-only">
                Mobile Navigation Menu
              </DialogTitle>
              <DialogDescription className="sr-only">
                Navigate through mobile-friendly site links.
              </DialogDescription>

              <div className="flex flex-col gap-4 items-center p-4">
                <div>
                  <Link href="/">
                    <Image
                      src="/Logo/company-logo.webp"
                      width={140}
                      height={40}
                      alt="logo"
                    />
                  </Link>
                </div>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link href="/archive">Archive</Link>
                <Link href="/listing">Listing</Link>
                <Link href="/others">Others</Link>

                <NavigationMenuItem className="bg-transparent hover:bg-transparent list-none">
                  {visitor?.fullname ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">
                        Hi, {visitor?.fullname}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={handleLogout}
                              className="cursor-pointer ml-5 text-primary hover:text-red-500"
                            >
                              <LogOut className="w-5 h-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Logout</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <Button
                      className="px-4 py-2 bg-primary text-white font-semibold rounded-md text-sm hover:bg-amber-950 transition"
                      onClick={() => setShowModal(true)}
                    >
                      Login / Sign Up
                    </Button>
                  )}

                  {/* Modal */}
                  {showModal && (
                    <div
                      style={{ backgroundColor: "rgb(194 149 100 / 33%)" }}
                      className="fixed   inset-0 bg-opacity-50 flex items-center justify-center w-[100%] h-[115vh] z-50"
                    >
                      <div className=" bg-white flex items-center justify-center  rounded-[40px] shadow-xl   relative">
                        {/* login in form */}

                        {/* signup form */}
                        {isOpen ? (
                          <StyledWrapper>
                            <div className="container ">
                              <div className="heading">Sign In</div>
                              <form onSubmit={handleSubmit} className="form">
                                <input
                                  onChange={(e) => {
                                    setform((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }));
                                  }}
                                  required
                                  className="input"
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="E-mail"
                                />
                                <input
                                  onChange={(e) => {
                                    setform((prev) => ({
                                      ...prev,
                                      password: e.target.value,
                                    }));
                                  }}
                                  required
                                  className="input"
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                />
                                <span className="forgot-password">
                                  <a href="#">Forgot Password ?</a>
                                </span>
                                <input className="login-button" type="submit" />
                              </form>
                              <div className="social-account-container">
                                {/* <span className="title"></span> */}
                                <div className="social-accounts">
                                  {/* <button className="social-button google">
                                  <svg
                                    viewBox="0 0 488 512"
                                    height="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="svg"
                                  >
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                  </svg>
                                </button> */}
                                  <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={handleGoogleLogin}
                                    type="icon"
                                    theme="filled_black"
                                    size="large"
                                    shape="circle"
                                  />
                                </div>
                              </div>
                              <span
                                className="agreement"
                                onClick={() => setIsOpen(false)}
                              >
                                <a>Create your account</a>
                              </span>
                              <Button
                                style={{
                                  background:
                                    "linear-gradient(0deg, rgba(190, 142, 90, 0.16) 0%, rgba(190, 142, 90, 0.08) 100%)",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  borderRadius: "60%",
                                  marginTop: "10px",
                                  width: "30px",
                                  height: "30px",
                                }}
                                onClick={() => setShowModal(false)}
                                className="top-[10px] right-[20px] absolute"
                              >
                                X
                              </Button>
                            </div>
                          </StyledWrapper>
                        ) : (
                          <StyledWrapper>
                            <div className="container">
                              <div className="heading">Sign Up</div>
                              <form onSubmit={handleSubmit1} className="form">
                                <div className="flex gap-4">
                                  <input
                                    onChange={(e) =>
                                      setSignUpForm((prev) => ({
                                        ...prev,
                                        fullname: e.target.value,
                                      }))
                                    }
                                    required
                                    className="input flex-1"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name"
                                  />
                                  <input
                                    onChange={(e) =>
                                      setSignUpForm((prev) => ({
                                        ...prev,
                                        phone_number: e.target.value,
                                      }))
                                    }
                                    required
                                    className="input flex-1"
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone Number"
                                  />
                                </div>

                                <input
                                  onChange={(e) =>
                                    setSignUpForm((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }))
                                  }
                                  required
                                  className="input"
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="E-mail"
                                />

                                <input
                                  onChange={(e) =>
                                    setSignUpForm((prev) => ({
                                      ...prev,
                                      password: e.target.value,
                                    }))
                                  }
                                  required
                                  className="input"
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                />

                                <div className="flex gap-4">
                                  <input
                                    required
                                    className="input flex-1"
                                    type="number"
                                    name="otp"
                                    id="otp"
                                    onChange={(e) =>
                                      setVerfiyOtp((prev) => ({
                                        ...prev,
                                        verifiyOtp: e.target.value,
                                      }))
                                    }
                                    // onChange={()=>{setVerfiyOtp}}
                                    placeholder="Enter OTP"
                                    style={{ height: "60px" }}
                                  />
                                  <button
                                    type="button"
                                    // enable only when OTP input has value
                                    onClick={verifiyOtp}
                                    className="login-button flex-1"
                                  >
                                    Get OTP
                                  </button>
                                </div>

                                <span className="forgot-password">
                                  <a href="#">Forgot Password?</a>
                                </span>
                                <button
                                  disabled={!otp}
                                  // onClick={handleClick}
                                  className={`login-button flex items-center gap-2 ${!otp ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                  {!otp}
                                  Submit
                                </button>

                                {/* <input className="login-button" disabled   type="submit" value="Submit" /> */}
                              </form>

                              <div className="social-account-container">
                                {/* social buttons if needed */}
                              </div>

                              <span
                                className="agreement"
                                onClick={() => setIsOpen(true)}
                              >
                                <a>Already Login</a>
                              </span>

                              <Button
                                style={{
                                  background:
                                    "linear-gradient(0deg, rgba(190, 142, 90, 0.16) 0%, rgba(190, 142, 90, 0.08) 100%)",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  borderRadius: "60%",
                                  marginTop: "10px",
                                  width: "30px",
                                  height: "30px",
                                }}
                                onClick={() => setShowModal(false)}
                                className="top-[10px] right-[20px] absolute"
                              >
                                X
                              </Button>
                            </div>
                          </StyledWrapper>
                        )}
                      </div>
                    </div>
                  )}
                  {/* // )} */}
                </NavigationMenuItem>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block p-3 rounded-md hover:bg-gray-100 transition-colors"
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-xs text-gray-500 line-clamp-2">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const StyledWrapper = styled.div`
  .container {
    max-width: 450px;
    background: #be8e5a;
    background: linear-gradient(
      0deg,
      rgba(190, 142, 90, 0.16) 0%,
      rgba(190, 142, 90, 0.08) 100%
    );
    border-radius: 40px;

    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(190, 142, 90, 0.47) 0px 30px 30px -20px;
    // margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #be8e5a;
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: rgba(190, 142, 90, 0.41) 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: #be8e5a;
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #be8e5a;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: #be8e5a;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(190, 142, 90) 0%,
      rgba(190, 142, 90, 0.67) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(190, 142, 90, 0.66) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(190, 142, 90, 0.7) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(190, 142, 90, 0.66) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(
      45deg,
      rgb(0, 0, 0) 0%,
      rgb(112, 112, 112) 100%
    );
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: #be8e5a 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #be8e5a;
    font-size: 14px;
  }
  .agreement a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
