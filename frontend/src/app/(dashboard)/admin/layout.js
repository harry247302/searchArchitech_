"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useDispatch } from "react-redux";
import { getAdminsDetails } from "@/app/redux/slices/adminslice/AdminAuthSlice";
import { getVisitorsByTodayTomorrow } from "@/app/redux/slices/visitorSlice/visitorSlice";
import { getTicketsForArchitect } from "@/app/redux/slices/ticketSlice/TicketSlice";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(
          ` ${
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
          router.replace("/admin-login");
        }
      } catch (e) {
        router.replace("/admin-login");
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [router]);

  // const dispatch = useDispatch()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await dispatch(getTicketsForArchitect());
        // console.log(res,"::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        //   if(res?.meta?.requestStatus === "fulfilled"){
        //     setTickets(res?.payload?.tickets)
        //   }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminsResponse = await dispatch(getAdminsDetails());
        const visitorsResponse = await dispatch(getVisitorsByTodayTomorrow());
        // console.log(visitorsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const section = pathname.split("/")[2] || "dashboard"; // e.g., "admin/settings" → "settings"
    setActiveSection(section);
  }, [pathname]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Navbar
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
