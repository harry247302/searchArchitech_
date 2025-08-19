"use client";

import React from "react";
import Link from "next/link";
import agents from "@/static-data/agents";

import Image from "next/image";
import { Star, Phone } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";

const ITEMS_PER_PAGE = 8;

const SuperAgents = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);

  const currentProjects = agents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="relative h-64 md:h-80 w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* <Image
                  src="/banner/breadcrumb.jpg"
                  alt="About Us Banner"
                  fill
                  className="object-cover object-center w-full h-full"
                  priority
                /> */}
        </div>

        {/* Dark + Blurred Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Centered Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="mb-4 text-2xl">
            <Link
              href="/"
              className="text-2xl text-primary hover:text-amber-800"
            >
              Home
            </Link>{" "}
            | Super Agents
          </p>
          <h1 className="text-4xl">Super Agents</h1>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ margin: "50px" }}
          >
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className="rounded-2xl overflow-hidden shadow border-0 bg-white p-0"
              >
                <div className="relative">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={400}
                    height={0}
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-yellow-500 text-sm font-semibold shadow-sm">
                    <Star size={16} className="fill-yellow-400" />
                    {agent.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-gray-800 font-semibold text-lg">
                    {agent.name}
                  </div>
                  <div className="flex items-center text-red-600 mt-1 text-sm gap-1">
                    <Phone size={16} />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {agent.company}
                  </div>
                  <div className="text-sm text-gray-400">{agent.license}</div>
                  <button className="mt-4 text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-amber-950">
                    Contact Me
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-primary text-white" : ""
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default SuperAgents;
