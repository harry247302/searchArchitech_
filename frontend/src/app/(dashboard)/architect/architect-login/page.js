"use client";

import ArchitectLogin from "@/app/(dashboard)/architect/architect-login/ArchitectLogin";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// import dynamic from "next/dynamic";

// const ArchitectLogin = dynamic(() => import("@/app/web-pages/ArchitectLogin"), {
//   ssr: false,
// });

const page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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

        if (res.ok) {
          router.replace("/architect");
          return;
        }
      } catch (e) {
        router.replace("/pages/architect-login");
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [router]);

  return (
    <>
      <ArchitectLogin />
    </>
  );
};

export default page;
