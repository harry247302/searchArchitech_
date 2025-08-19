"use client";

import * as React from "react";
import Image from "next/image";
// import { Card, CardContent } from "./ui/card";
import Link from "next/link";
// import Navbar from "./components/Navbar";
// import Footer from "@/components/Footer";
import { Card, CardContent } from "../components/ui/card";

const categories = [
    {
        name: "Wallpapers",
        image: "/categories-banner/products-categories/wallpapers.jpg",
        link: "/categories/wallpapers",
    },
    {
        name: "Exteriors",
        image: "/categories-banner/products-categories/exterior.jpg",
        link: "/categories/exteriors",
    },
    {
        name: "Flooring",
        image: "/categories-banner/products-categories/flooring.jpg",
        link: "/categories/flooring",
    },
    {
        name: "Lights",
        image: "/categories-banner/products-categories/lights.jpg",
        link: "/categories/lights",
    },
];

export default function AllCategories() {
    return (
        <>
            {/* <Navbar /> */}
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 w-full">

                <div className="absolute inset-0">
                    <Image
                        src="/categories-banner/breadcrumb.png"
                        alt="Categories Banner"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <p className="mb-4 text-lg sm:text-xl">
                        <Link
                            href="/"
                            className="text-primary hover:text-amber-300 transition-colors"
                        >
                            Home
                        </Link>{" "}
                        | Product Categories
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold">Product Category</h1>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="px-4 md:px-8 lg:px-16 py-16 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto">
                    {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                        <h2 className="text-3xl font-bold text-gray-800"></h2>
                        <Link
                            href="/categories"
                            className="text-2xl underline sm:text-base text-gray-800 font-semibold hover:underline"
                        >
                            Show All Categories
                        </Link>
                    </div> */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Explore Categories
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link key={index} href={category.link}>
                                <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer p-0">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                    <CardContent className="p-4 text-center">
                                        <h3 className="text-lg font-semibold">{category.name}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    );
}