import React, { Suspense } from "react";
import Search from "@/app/web-pages/Search";
import Preloader from "@/components/Preloader";

const Page = () => {
  return (
    <Suspense fallback={<div><Preloader/></div>}>
      <Search />
    </Suspense>
  );
};

export default Page;