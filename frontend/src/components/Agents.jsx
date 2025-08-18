"use client";

// import { useState } from "react";
import Link from "next/link";
// import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone } from "lucide-react";
import Image from "next/image";
// import agents from "@/static-data/agents";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { dynamic_architech } from "@/app/redux/slices/architectSlice/ArchitectSlice";

export default function Agents() {
  // const [mode, setMode] = useState("Agent");
  //   const [dynamicArchitech, setDynamicArchitech] = useState([])
  //   const dispatch = useDispatch()
  //   // const [shadab, setShadab] = useState("shadab")
  // useEffect(()=>{
  //   const fetchData = async ()=>{
  //     const res = await dispatch(dynamic_architech())
  //     console.log(res,"--------------------------------");

  //     if(res?.meta?.requestStatus === "fulfilled"){
  //       setDynamicArchitech(res?.payload?.data)
  //       // console.log(shadab,"//////////////////");
  //       console.log(res.payload.data, "-----------------")
  //     }
  //   }
  //   fetchData()
  // },[])

  // useEffect(()=>{
  //   if (agents.length > 0) {
  //     console.log(agents, "------ Updated Agents ------");
  //   }
  // },[agents])

  const [dynamicArchitech, setDynamicArchitech] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(dynamic_architech());
      // console.log(res, "--------------------------------");

      if (res?.meta?.requestStatus === "fulfilled") {
        setDynamicArchitech(res?.payload?.data);
        // console.log(res.payload.data, "-----------------"); // ✅ Immediate data
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dynamicArchitech.length) {
      // console.log(dynamicArchitech, "✅ dynamicArchitech updated");
    }
  }, [dynamicArchitech]);


  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Fetch image size after load
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageSize({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Agents Nearby Your Location
          </h2>
          <div className="flex gap-2">
            {/* <Toggle
              pressed={mode === "Agent"}
              onPressedChange={() => setMode("Agent")}
            > */}
            {/* <Link href="/super-agents">Agent</Link> */}
            {/* </Toggle> */}
            {/* <Toggle
              pressed={mode === "Agency"}
              onPressedChange={() => setMode("Agency")}
            >
              <Link href='/superAgent'>
              Agency
              </Link>
            </Toggle> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicArchitech.map((agent) => (
            <Card
              key={agent.id}
              className="rounded-2xl overflow-hidden shadow border-0 bg-white p-0"
            >
              {/* <div className="relative">
                <img
                  src={agent.profile_url}
                  alt={agent.name || "architect image"}
                  
                  className="w-[100%] h-[50%] object-cover"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-yellow-500 text-sm font-semibold shadow-sm">
                  <Star size={16} className="fill-yellow-400" />
                  {agent.rating}
                </div>
              </div> */}

              <div className="relative w-full rounded-xl overflow-hidden shadow-md group">
                {/* Architect Image */}
                <img
                  src={agent.profile_url}
                  alt={agent.name || "Architect Image"}
                  onLoad={handleImageLoad}
                  className="w-full h-44 sm:h-52 md:h-50 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-yellow-500 text-sm font-semibold shadow">
                  <Star size={16} className="fill-yellow-400" />
                  {agent.rating}
                </div>

                {/* Image Size Badge */}
                {/* {imageSize.width > 0 && imageSize.height > 0 && (
                  <div className="absolute bottom-2 right-2 bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full shadow"> */}
                {/* {imageSize.width}×{imageSize.height} */}
                {/* </div>
                )} */}
              </div>
              <CardContent className="p-4">
                <div className="text-gray-800 font-semibold text-lg">
                  {agent.first_name}
                </div>
                <div className="flex items-center text-red-600 mt-1 text-sm gap-1">
                  <Phone size={16} />
                  <span>{agent.phone_number}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {agent.company_name}
                </div>
                <div className="text-sm text-gray-400">{agent.gst_no}</div>
                <Link href={`/pages/search-architect/${agent.uuid}`}>
                  <button className="mt-4 text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-amber-950">
                    Contact Me
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/pages/search-architect">
            <button className="flex items-center gap-2 text-sm text-gray-900 underline font-medium hover:underline cursor-pointer">
              More Details +
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}