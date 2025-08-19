"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRandomProjects } from "../redux/slices/projectSlice/ProjectSlice";

const page = () => {
    const dispatch = useDispatch()
  useEffect(() => {    
    dispatch(fetchRandomProjects())
  }, [])
  return <div>page</div>;
};

export default page;
