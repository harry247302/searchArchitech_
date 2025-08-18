"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import SuperAgents from "@/components/SuperAgents";
import OurAchievements from "@/components/OurAchievements";
import PremiumWallpapers from "@/components/PremiumWallpapers";
import Projects from "@/components/Projects";
import Agents from "@/components/Agents";
import Awards from "@/components/Awards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchAllArchitects } from "./redux/slices/architectSlice/ArchitectSlice";
import { useDispatch } from "react-redux";
import { getVisitorById } from "./redux/slices/visitorSlice/VisitorAuth";
import BackToTop from "@/components/BackToTop";
import ArchitectCategories from "@/components/ArchitectCategories";
// import BackToTop from "@/components/BackToTop";

export default function Home() {
  const dispatch = useDispatch()
useEffect(() => {
  const fetchVisitors = async () => {
    try {
      const res = await dispatch(getVisitorById());
      console.log(res, "Visitor Data");
    } catch (error) {
      console.error(error);
    }
  };
  fetchVisitors();
}, []);

  
  return (
<>
    {/* <Navbar /> */}
    <ToastContainer />
    <BackToTop/>
    <Banner />
    {/* <SuperAgents /> */}
    <ArchitectCategories />
    <OurAchievements />
    <PremiumWallpapers />
    <Projects/>
    <Agents />
    <Awards/>
    <Footer />
</>
  );
}
