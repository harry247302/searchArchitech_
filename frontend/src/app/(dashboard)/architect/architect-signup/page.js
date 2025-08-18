"use client"

import ArchitectSignUp from '@/app/(dashboard)/architect/architect-signup/ArchitectSignup'
// import dynamic from 'next/dynamic';

import React from 'react'

// const ArchitectSignUp = dynamic(() => import("@/app/web-pages/ArchitectSignUp"), {
//   ssr: false,
// });

const page = () => {
  return (
    <>
    <ArchitectSignUp />
    </>
  )
}

export default page