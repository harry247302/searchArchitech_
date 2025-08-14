"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { checkAdminLogin } from "@/app/redux/slices/adminslice/AdminAuthSlice";
import dynamic from "next/dynamic";

// Disable SSR for AdminLogin component
const AdminLogin = dynamic(() => import("./AdminLogin"), { ssr: false });

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await dispatch(checkAdminLogin()).unwrap();
        if (res?.message === "Authenticated") {
          router.replace("/admin");
        } else {
          router.replace("/admin-login");
        }
      } catch (err) {
        router.replace("/admin-login");
      }
    };

    checkLogin();
  }, [dispatch, router]);

  return <AdminLogin />;
};

export default Page;
