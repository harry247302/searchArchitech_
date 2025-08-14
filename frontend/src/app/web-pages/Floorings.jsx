"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: "F001",
    name: "Wooden Flooring",
    description: "Elegant and durable wooden planks for classic interiors.",
    price: 1299,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F002",
    name: "Ceramic Tiles",
    description: "High-quality ceramic tiles ideal for walls and floors.",
    price: 899,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F003",
    name: "Vinyl Flooring",
    description: "Affordable, water-resistant and easy to install.",
    price: 749,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F004",
    name: "Marble Flooring",
    description: "Luxurious marble with natural veins and shine.",
    price: 1999,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F005",
    name: "Laminate Flooring",
    description: "Stylish and cost-effective alternative to wood.",
    price: 999,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F006",
    name: "Granite Flooring",
    description: "Strong and sleek granite for heavy-duty use.",
    price: 1799,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F007",
    name: "Porcelain Tiles",
    description: "Dense, stain-resistant tiles for modern spaces.",
    price: 1099,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F008",
    name: "Engineered Wood Flooring",
    description: "Real wood veneer layered for stability and beauty.",
    price: 1499,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F009",
    name: "Terracotta Tiles",
    description: "Rustic charm with natural clay finish.",
    price: 899,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F010",
    name: "Mosaic Flooring",
    description: "Artistic small tiles to create vibrant patterns.",
    price: 1299,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F011",
    name: "Concrete Flooring",
    description: "Minimalist industrial style with smooth finish.",
    price: 999,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F012",
    name: "Bamboo Flooring",
    description: "Eco-friendly and durable alternative to hardwood.",
    price: 1399,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F013",
    name: "Travertine Tiles",
    description: "Textured, earthy tiles for a natural stone look.",
    price: 1599,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F014",
    name: "Carpet Tiles",
    description: "Soft and modular carpet squares for custom layouts.",
    price: 899,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F015",
    name: "Slate Flooring",
    description: "Rugged and rich colored natural stone option.",
    price: 1699,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
  {
    id: "F016",
    name: "Resin Flooring",
    description: "Seamless, chemical-resistant surface for industrial use.",
    price: 1499,
    image: "/categories-banner/products-categories/flooring.jpg",
  },
];

const Flooring = () => {
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
            | Flooring
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">Flooring</h1>
        </div>
      </section>

      {/* Products Section */}
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Flooring Products
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

export default Flooring;
