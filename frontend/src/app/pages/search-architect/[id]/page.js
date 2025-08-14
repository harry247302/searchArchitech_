"use client"
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

// Use uppercase for component names
const NoSSRArchitectProfile = dynamic(() => import("@/app/web-pages/ArchitectProfile"), {
  ssr: false,
});

export default function ArchitectDetails() {
  return (
    <>
      {/* <Navbar /> */}
      <NoSSRArchitectProfile />
    </>
  );
}
