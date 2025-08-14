"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: "W001",
    name: "Floral Wallpaper",
    description: "Elegant floral patterns to brighten up any room.",
    price: 799,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W002",
    name: "Geometric Wallpaper",
    description: "Bold shapes and lines for a modern look.",
    price: 899,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W003",
    name: "Textured Wallpaper",
    description: "Add depth with realistic textures and layers.",
    price: 999,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W004",
    name: "Vintage Wallpaper",
    description: "Timeless designs inspired by classic interiors.",
    price: 849,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W005",
    name: "Metallic Wallpaper",
    description: "Shimmering surfaces to glam up your walls.",
    price: 1199,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W006",
    name: "3D Effect Wallpaper",
    description: "Create illusion and depth with 3D patterns.",
    price: 1299,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W007",
    name: "Nature Wallpaper",
    description: "Scenic landscapes and botanicals for tranquility.",
    price: 899,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W008",
    name: "Brick Effect Wallpaper",
    description: "Urban style with realistic brick visuals.",
    price: 949,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W009",
    name: "Abstract Wallpaper",
    description: "Creative designs to energize modern spaces.",
    price: 1049,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W010",
    name: "Children's Wallpaper",
    description: "Playful themes and vibrant colors for kids' rooms.",
    price: 749,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W011",
    name: "Damask Wallpaper",
    description: "Classic damask prints for luxury interiors.",
    price: 1099,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W012",
    name: "Marble Look Wallpaper",
    description: "Elegant marble visuals without the weight.",
    price: 999,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W013",
    name: "Wood Panel Wallpaper",
    description: "Natural wood texture without carpentry.",
    price: 949,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W014",
    name: "Tropical Wallpaper",
    description: "Bold leaves and exotic patterns for vibrance.",
    price: 899,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W015",
    name: "Minimalist Wallpaper",
    description: "Subtle designs for modern and calm aesthetics.",
    price: 849,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
  {
    id: "W016",
    name: "Boho Wallpaper",
    description: "Free-spirited patterns for artistic souls.",
    price: 949,
    image: "/categories-banner/products-categories/wallpapers.jpg",
  },
];


const Wallpapers = () => {
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
            </Link>
            <Link
              href="/categories"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {" "}
              | Product Categories
            </Link>{" "}
            | Wallpapers
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">Wallpapers</h1>
        </div>
      </section>

      {/* Products Section */}
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Wallpapers Products
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

      <Footer />
    </>
  );
};

export default Wallpapers;
