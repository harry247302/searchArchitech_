"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  UserMinus,
  Ticket,
  Eye,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { mockStats } from "./data/demo";
import { fetchAllArchitects} from "@/app/redux/slices/architectSlice/ArchitectSlice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch()

  const [architects, setArchitects] = useState();
  const [approveArchitect, setApproveArchitect] = useState()
  const [blockArchitect, setblockArchitect ] = useState()
  const [todayVisitor, setTodayVisitor] = useState()
  const visitors = useSelector(state =>state?.visitor?.visitorInfo)
  const tickets = useSelector(state =>state?.ticket?.fetchTicket?.tickets)

  
  
  useEffect(() => {
    const getArchitects = async () => {
      try {
        const res = await dispatch(fetchAllArchitects());
        // console.log(res);
        
        const data = res.payload;

        if (res?.payload?.success) {
          setArchitects(data.data);

          const ApproveArchitectfilter = data.data.filter(
            (ele) => ele.active_status === "true"
          );
          const BlockArchitectfilter = data.data.filter(
            (ele) => ele.active_status === "false"
          );

          setApproveArchitect(ApproveArchitectfilter);
          setblockArchitect(BlockArchitectfilter);
        }
      } catch (error) {
        console.error("Failed to fetch architects:", error);
      }
    };

    getArchitects();
  }, [dispatch]);


  const [currentTime, setCurrentTime] = useState("");
  const stats = mockStats;
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);




  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-110">
            {value}
          </p>
          {change && (
            <p
              className={`text-sm transition-all duration-300 ${change.positive ? "text-green-600" : "text-red-600"
                } group-hover:font-semibold`}
            >
              {change.positive ? "+" : ""}
              {change.value}% from last month
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
        >
          <Icon
            className="w-6 h-6 text-white transition-transform duration-300"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <section
      aria-labelledby="recent-activity-title"
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <h3 id="recent-activity-title" className="text-lg font-semibold mb-4">
        Recent Activities
      </h3>
      <div className="space-y-3">
        {[
          {
            action: "New architect registered",
            name: "Sarah Johnson",
            time: "2 hours ago",
            type: "registration",
          },
          {
            action: "Ticket resolved",
            name: "Portfolio Upload Issue",
            time: "4 hours ago",
            type: "ticket",
          },
          {
            action: "Document verified",
            name: "John Smith License",
            time: "6 hours ago",
            type: "document",
          },
          {
            action: "Architect suspended",
            name: "Michael Chen",
            time: "1 day ago",
            type: "suspension",
          },
        ].map((activity, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2 hover:shadow-sm`}
            role="listitem"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-150 ${activity.type === "registration"
                  ? "bg-green-500"
                  : activity.type === "ticket"
                    ? "bg-blue-500"
                    : activity.type === "document"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.name}</p>
            </div>
            {/* <time className="text-xs text-gray-400 transition-colors duration-300 hover:text-gray-600" dateTime={new Date().toISOString()}>
              {activity.time}
            </time> */}
            <time className="text-xs text-gray-400 transition-colors duration-300 hover:text-gray-600">
              {activity.time}
            </time>
          </div>
        ))}
      </div>
    </section>
  );

  const QuickActions = () => (
    <section
      aria-labelledby="quick-actions-title"
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <h3 id="quick-actions-title" className="text-lg font-semibold mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          {
            title: "Review Pending Documents",
            count: 8,
            color: "bg-yellow-500",
          },
          { title: "Respond to New Tickets", count: 5, color: "bg-red-500" },
          { title: "Approve Architects", count: 3, color: "bg-green-500" },
          { title: "Download Reports", count: 2, color: "bg-blue-500" },
        ].map((action, index) => (
          <button
            key={index}
            type="button"
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:border-blue-300 group"
          >
            <span className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600">
              {action.title}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs text-white ${action.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
            >
              {action.count}
            </span>
          </button>
        ))}
      </div>
    </section>
  );

  return (
    <main className="space-y-6 animate-fade-in p-4 md:p-8 max-w-full">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-900 animate-slide-in-left">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500">
          Last updated: {currentTime || "Loading..."}
        </p>
      </header>

      {/* Stats Grid */}
      <section
        aria-label="Architect and ticket statistics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-in"
      >
        <StatCard
          title="Total Architects"
          value={architects?.length}
          icon={Users}
          color="bg-blue-500"
          change={{ positive: true, value: 12 }}
        />
        <StatCard
          title="Approved Architects"
          value={approveArchitect?.length}
          icon={UserCheck}
          color="bg-green-500"
          change={{ positive: true, value: 8 }}
        />
        <StatCard
          title="Blocked Architects"
          value={blockArchitect?.length}
          icon={UserX}
          color="bg-red-500"
          change={{ positive: false, value: 2 }}
        />
        {/* <StatCard
          title="Suspended Architects"
          value={stats.suspendedArchitects}
          icon={UserMinus}
          color="bg-yellow-500"
          change={{ positive: false, value: 1 }}
        /> */}
      </section>

      {/* Ticket Stats */}
      <section
        aria-label="Ticket statistics"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          title="Total Tickets"
          value={tickets?.length}
          icon={Ticket}
          color="bg-purple-500"
        />
        {/* <StatCard
          title="Open Tickets"
          value={stats.openTickets}
          icon={AlertCircle}
          color="bg-orange-500"
        /> */}
        <StatCard
          title="Resolved Tickets"
          value={stats.resolvedTickets}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </section>

      {/* Visitor Stats */}
      <section
        aria-label="Visitor statistics"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <StatCard
          title="Today's Visitors"
          value={visitors?.today?.length}
          icon={Eye}
          color="bg-indigo-500"
        />
        <StatCard
          title="Monthly Visitors"
          value={visitors?.month?.length}
          icon={TrendingUp}
          color="bg-teal-500"
        />
        {/* <StatCard
          title="Avg. Architects Approached"
          value={stats.avgArchitectsApproached}
          icon={Users}
          color="bg-cyan-500"
        /> */}
      </section>

      {/* Charts and Activities */}
      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Monthly Registration Trend
          </h3>
          <div className="h-64 flex items-end space-x-2 overflow-x-auto">
            {[45, 52, 38, 67, 73, 82, 94, 87, 76, 89, 95, 103].map(
              (value, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group min-w-[30px]"
                >
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600 transform hover:scale-105"
                    style={{ height: `${(value / 103) * 200}px` }}
                    aria-label={`Registrations in ${[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ][index]
                      }`}
                    role="img"
                  />
                  <span className="text-xs text-gray-500 mt-1 transition-colors duration-300 group-hover:text-gray-700 group-hover:font-semibold select-none">
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ][index]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4">Ticket Resolution Time</h3>
          <div className="space-y-4">
            {[
              {
                category: "Technical Issues",
                time: "2.3 hours",
                percentage: 85,
              },
              {
                category: "Document Verification",
                time: "4.7 hours",
                percentage: 70,
              },
              { category: "Account Issues", time: "1.8 hours", percentage: 90 },
              {
                category: "General Inquiries",
                time: "3.2 hours",
                percentage: 75,
              },
            ].map((item, index) => (
              <div key={index} className="space-y-1 group">
                <div className="flex justify-between text-sm">
                  <span className="transition-colors duration-300 group-hover:text-blue-600">
                    {item.category}
                  </span>
                  <span className="font-medium transition-colors duration-300 group-hover:text-blue-800">
                    {item.time}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 hover:bg-blue-600"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Recent Activity and Quick Actions */}
      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </section> */}
    </main>
  );
};

export default Main;