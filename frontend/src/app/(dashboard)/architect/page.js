"use client";

import dynamic from "next/dynamic";

// Import Main only on the client
const Main = dynamic(() => import("./Main"), { ssr: false });

export default function Page() {
  return <Main />;
}
