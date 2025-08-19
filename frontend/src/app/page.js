"use client"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVisitorById } from "./redux/slices/visitorSlice/VisitorAuth";
import BackToTop from "./components/BackToTop";
import Banner from "./components/Banner";

import OurAchievements from "./components/OurAchievements";
import PremiumWallpapers from "./components/PremiumWallpapers";

import Agents from "./components/Agents";
import Awards from "./components/Awards";
import Footer from "./components/Footer";
import { fetchRandomProjects } from "./redux/slices/projectSlice/ProjectSlice";
import Projects from "./components/Projects";
import SuperAgents from "./components/SuperAgents";
import Categories from "./web-pages/Categories";


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

  useEffect(() => {    
    dispatch(fetchRandomProjects())
  }, [])

  
  return (
<>
    {/* <Navbar /> */}
    <ToastContainer />
    <BackToTop/>
    <Banner />
    <SuperAgents />
    <OurAchievements />
    <Categories/>
    {/* <PremiumWallpapers /> */}
    <Projects/>
    <Agents />
    <Awards/>
    {/* <Footer /> */}
</>
  );
}
