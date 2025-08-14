'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Home,
  Users,
  Ticket,
  BarChart3,
  Bell,
  FileText,
  Settings,
  Shield,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useHandleLogout from '@/utils/logoutHandler';

const Navbar = ({ activeSection, setActiveSection, setSidebarCollapsed, sidebarCollapsed }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);     // Mobile menu
  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const admin = useSelector(state => state?.admin?.admin)

const clearAllCookies = () => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const hostname = window.location.hostname;
  const domainParts = hostname.split('.');
  const domain = domainParts.length > 1 ? '.' + domainParts.slice(-2).join('.') : hostname;
  const paths = ['/', '/admin', '/user', window.location.pathname];

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    paths.forEach(path => {
      // Without domain
      document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      // With root domain
      document.cookie = `${name}=; path=${path}; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      // With hostname domain
      document.cookie = `${name}=; path=${path}; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });
  }
};

  // const handleLogout = () => {
  //   const confirmed = window.confirm('Are you sure you want to logout?');
  //   if (!confirmed) return;

  //   clearAllCookies();
  //   localStorage.clear();
  //   sessionStorage.clear();

  //   router.push('/admin-login');
  // };

  const handleLogout = useHandleLogout();
  



  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: 'admin', icon: Home },
    { id: 'architects', label: 'Architects', href: 'admin/architects', icon: Users },
    { id: 'tickets', label: 'Tickets', href: 'admin/tickets', icon: Ticket },
    // { id: 'analytics', label: 'Analytics', href: 'admin/analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Query', href: 'admin/query', icon: Bell },
    { id: 'reports', label: 'Reports', href: 'admin/reports', icon: FileText },
    { id: 'settings', label: 'Settings', href: 'admin/settings', icon: Settings },
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    router.push(`/${item.href}`);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-slate-800 p-2 rounded-md shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-slate-900 text-white shadow-2xl z-40 
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        ${collapsed ? 'w-20' : 'w-64'}
      `}>

        {/* Collapse button (desktop only) */}
        <div className="absolute top-4 right-[-12px] hidden md:block z-50">
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setSidebarCollapsed(!sidebarCollapsed)
            }}
            className="bg-slate-800 text-white p-1 rounded-full shadow-md hover:bg-slate-700 transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-start space-x-2 group">
          <Shield className="w-8 h-8 text-blue-400 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
          {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 overflow-hidden">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'
                      } space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 hover:scale-105 ${activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg scale-105 translate-x-1'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      
        {/* <div
          onClick={handleLogout} 
          className="cursor-pointer p-3 px-5 border-t border-slate-700  hover:bg-[#2b7fff] transition-colors duration-300 flex items-center gap-2 text-amber-100"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

          <span className="font-medium">Logout</span>
        </div> */}

        <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="cursor-pointer p-3 px-5 border-t border-slate-700 hover:bg-[#2b7fff] transition-colors duration-300 flex items-center gap-2 text-amber-100"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
          <span className="font-medium">Logout</span>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        {/* </div> */}

        {/* Footer */}
        <div className={`p-4 border-t border-slate-700 hover:bg-slate-800 transition-colors duration-300`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <span className="text-sm font-medium">{admin?.first_name?.slice(0, 1)} {admin?.last_name?.slice(0, 1)}</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">{admin?.first_name} {admin?.last_name}</p>
                <p className="text-xs text-slate-400">{admin?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;