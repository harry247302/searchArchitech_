"use client"
import Projects from "@/app/web-pages/Projects";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {

  const state = useSelector(state=>state)
  console.log(state,"++++++++++++++++++++++++++++++++++++++++++++++");
  

  return (
    <>
      <Projects />
    </>
  );
};

export default page;
