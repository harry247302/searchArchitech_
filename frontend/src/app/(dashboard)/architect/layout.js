"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { fetchById } from "@/app/redux/slices/architectSlice/ArchitectSlice";
import { useDispatch } from "react-redux";
import { fetchFeedbackByArchitect } from "@/app/redux/slices/feedbackSlice/FeedbackSlice";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await dispatch(fetchFeedbackByArchitect());
      console.log(res, "++++++++++++++++++++++++++++++++++++++++++++++++++++");
    };
    fetchFeedback();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(fetchById());
        console.log(res, "::::::::::::::::::::::::::::::::;");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // Update activeSection based on current path
  useEffect(() => {
    const section = pathname.split("/")[2] || "dashboard"; // e.g., "admin/settings" → "settings"
    setActiveSection(section);
  }, [pathname]);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_MODE === "DEV"
              ? process.env.NEXT_PUBLIC_DEV_URL
              : process.env.NEXT_PUBLIC_PROD_URL
          }/superAdmin/check`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();
        setToken(data.token || "valid");
      } catch (e) {
        router.replace("/pages/architect-login");
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <main
        className={`transition-all duration-300 p-4 pt-6 w-full ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
