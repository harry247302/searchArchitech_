"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import projects from "@/static-data/projects-1";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ITEMS_PER_PAGE = 8;

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentProjects = projects.slice(
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
            <Image
            src="/categories-banner/breadcrumb.png"
            alt="About Us Banner"
            fill
            className="object-cover object-center w-full h-full"
            priority
          />
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
              | Projects
            </p>
            <h1 className="text-4xl">Projects</h1>
          </div>
        </section>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
      </div> */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProjects.map((project) => (
              <Card
                key={project.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg h-[300px] bg-gray-100"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <CardContent className="relative z-20 h-full flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm line-clamp-2">{project.description}</p>
                  <Link href={`/projects/${project.id}`}>
                    <button className="mt-4 text-sm bg-primary text-black px-3 py-1 rounded-md self-start hover:bg-primary/80 transition">
                      View More
                    </button>
                  </Link>
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
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-primary text-white" : ""
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
      <Footer />
    </>
  );
}
