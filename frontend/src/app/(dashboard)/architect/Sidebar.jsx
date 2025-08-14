"use client";
import React, { useState } from "react";
import {
  Home,
  User,
  Menu,
  FolderOpen,
  Mail,
  Briefcase,
  Star,
  MessageCircle,
  Settings,
  BarChart3,
  HelpCircle,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Clock,
  ChevronRight,
  ChevronLeft,
  Shield,
  Ticket,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; 


import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// import { architectLogout } from "@/app/redux/slices/architectSlice/ArchitectAuth";
import useHandleLogout from "@/utils/logoutHandler";

const Sidebar = ({
  activeSection,
  setActiveSection,
  setSidebarCollapsed,
  sidebarCollapsed,
}) => {
  const architect = useSelector((state) => state?.architect?.architects);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState();
  // const handleLogout = () => {
  //   const confirmed = window.confirm("Are you sure you want to logout?");
  //   if (!confirmed) return;
  //   document.cookie = "architectToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //   document.cookie =
  //     "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //   router.push("/pages/architect-login");
  // };

  //  const dispatch = useDispatch();
  const handleLogout = useHandleLogout();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "architect", icon: Home },
    { id: "profile", label: "Profile", href: "architect/profile", icon: User },
    {
      id: "portfolio",
      label: "Portfolio",
      href: "architect/portfolio",
      icon: FolderOpen,
    },
    // {
    //   id: "ongoingsProjects",
    //   label: "Projects",
    //   href: "architect/ongoingsProjects",
    //   icon: Briefcase,
    // },
    {
      id: "feedback",
      label: "Client Feedback",
      href: "architect/feedback",
      icon: Star,
    },
    {
      id: "settings",
      label: "Settings",
      href: "architect/settings",
      icon: Settings,
    },
    {
      id: "support",
      label: "Help & Support",
      href: "architect/support",
      icon: HelpCircle,
    },
    {
      id: "openTickets",
      label: "Tickets",
      icon: Ticket,
      children: [
        {
          id: "newTicket",
          label: "Open Ticket",
          href: "architect/open-ticket",
        },
        {
          id: "allTickets",
          label: "View Ticktes",
          href: "architect/view-tickets",
        },
      ],
    },
  ];

  const handleNavigation = (item) => {
    if (item.children) {
      setOpenDropdown((prev) => (prev === item.id ? null : item.id));
    } else {
      setActiveSection(item.id);
      router.push(`/${item.href}`);
      if (window.innerWidth < 768) setIsOpen(false);
    }
  };
  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 bg-primary p-2 rounded-md shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 left-0 h-screen bg-white text-gray-500 shadow-2xl z-40 
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 
    ${collapsed ? "w-20" : "w-70"}
  `}
      >
        <div className="absolute top-4 right-[-12px] hidden md:block z-50">
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            className="mr-4 bg-primary text-white p-1 rounded-full shadow-md hover:bg-primary-foreground transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="p-6 border-b border-gray-500 flex items-center justify-start space-x-2 group">
          <Shield className="w-8 h-8 text-primary transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-500">Architect Panel</h1>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 overflow-hidden">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <div>
                    <button
                      onClick={() => handleNavigation(item)}
                      // className={`w-full flex items-center ${
                      //   collapsed ? "justify-center" : "justify-start"
                      // } space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 hover:scale-105 ${
                      //   activeSection === item.id
                      //     ? "bg-secondary-foreground text-gray-500 "
                      //     : "text-gray-500 hover:bg-secondary-foreground active:text-secondary hover:text-primary"
                      // }`}

                      className={`w-full flex items-center ${
                        collapsed ? "justify-center" : "justify-start"
                      } space-x-3 px-4 py-3  transition-all duration-300 transform hover:translate-x-1 hover:scale-105 border-l-[4px] hover:border-l-primary ${
                        activeSection === item.id
                          ? "bg-secondary-foreground text-gray-500"
                          : "text-gray-500 hover:bg-secondary-foreground active:text-secondary hover:text-primary"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.label}</span>}
                      {!collapsed && item.children && (
                        <ChevronRight
                          className={`ml-auto transform transition-transform duration-300 ${
                            openDropdown === item.id ? "rotate-90" : ""
                          }`}
                          size={16}
                        />
                      )}
                    </button>

                    {/* Child items dropdown */}
                    {item.children &&
                      openDropdown === item.id &&
                      !collapsed && (
                        <ul className="ml-5 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <button
                                onClick={() => {
                                  setActiveSection(child.id);
                                  router.push(`/${child.href}`);
                                  if (window.innerWidth < 768) setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-foreground transition-all duration-300 transform hover:translate-x-1 hover:scale-105 border-l-[4px] hover:border-l-primary ${
                                  activeSection === child.id
                                    ? "text-gray-500 hover:bg-secondary-foreground hover:text-primary"
                                    : "text-gray-500 hover:bg-secondary-foreground hover:text-primary"
                                }`}
                              >
                                {child.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}

        {/* Footer */}

        {/* <div
          onClick={() => handleLogout("/pages/architect-login")} // your logout function here
          className="cursor-pointer p-3 px-5 border-t border-gray-200 hover:bg-secondary-foreground transition-colors duration-300 flex items-center gap-2 text-amber-100"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>

          <span className="font-medium text-black hover:text-primary">
            Logout
          </span>
        </div> */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className="cursor-pointer p-3 px-5 border-t border-gray-200 hover:bg-secondary-foreground transition-colors duration-300 flex items-center gap-2 text-amber-100"
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>

              <span className="font-medium text-black hover:text-primary">
                Logout
              </span>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You’ll be redirected to the login page after logout.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleLogout("/pages/architect-login")}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="bottom-0 text-xs text-gray-500">
          <div
            className={`pr-2 border-amber-950 hover:bg-secondary-foreground transition-colors duration-300 hover:text-primary`}
          >
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <div className="m-2 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                {architect?.profile_url ? (
                  <img
                    src={architect.profile_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-white bg-amber-950 w-full h-full flex items-center justify-center">
                    {architect?.first_name?.[0] || "?"}
                  </span>
                )}
              </div>

              {!collapsed && (
                <div>
                  <p className="text-sm font-medium">
                    {architect?.first_name} {architect?.last_name}
                  </p>
                  <p className="text-xs text-black hover:text-primary">
                    {architect?.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
