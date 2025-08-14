'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Main with SSR disabled
const Main = dynamic(() => import('./Main'), { ssr: false });

const Page = () => {
  return (
    <div><Main /></div>
  );
};

export default Page;
