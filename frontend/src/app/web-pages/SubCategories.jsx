"use client";
import * as React from "react";
import { Card, CardContent } from "../components/ui/card";
import { useParams } from "next/navigation";


import Link from "next/link";

export default function SubCategories({ products }) {
    const params = useParams();
    const categoryName = params?.categoryName;
    console.log(categoryName);
    return (
        <>
            {/* <Navbar /> */}

            {/* Hero Section */}
            <section className="relative h-64 md:h-80 w-full">
                <div className="absolute inset-0">
                    <img
                        // src="/categories-banner/ breadcrumb.png"
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
                        </Link>
                        <Link
                            href="/categories"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            {" "}
                            | Product Categories
                        </Link>{" "}
                        | Lights
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold">Lights</h1>
                </div>
            </section>

            {/* Products Section */}
            <div className="p-6 max-w-screen-xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                    Light Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="mt-2 text-green-600 font-bold">
                                    ₹{product.price}
                                </p>
                                <p className="text-xs text-gray-500">Item ID: {product.id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
}