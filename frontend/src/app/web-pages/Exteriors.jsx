"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: "E001",
    name: "Exterior Wall Cladding",
    description: "Weather-resistant cladding for a stylish facade.",
    price: 1599,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E002",
    name: "Roof Shingles",
    description: "Durable and aesthetic roofing solution.",
    price: 1399,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E003",
    name: "Facade Panels",
    description: "Modern facade panels for sleek architecture.",
    price: 1899,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E004",
    name: "Stone Veneers",
    description: "Natural look stone finish for outdoor walls.",
    price: 1749,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E005",
    name: "Wooden Decking",
    description: "Smooth outdoor flooring with hardwood finish.",
    price: 1299,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E006",
    name: "Pergolas",
    description: "Elegant shaded structures for gardens or patios.",
    price: 2499,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E007",
    name: "Garden Fencing",
    description: "Secure and stylish boundaries for your garden.",
    price: 899,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E008",
    name: "Exterior Paint",
    description: "Weatherproof paint to protect and enhance walls.",
    price: 699,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E009",
    name: "Metal Railings",
    description: "Durable railings for balconies and staircases.",
    price: 1099,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E010",
    name: "Outdoor Tiles",
    description: "Anti-slip and durable tiles for exteriors.",
    price: 999,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E011",
    name: "Concrete Pavers",
    description: "Heavy-duty paving blocks for walkways.",
    price: 1149,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E012",
    name: "Louver Panels",
    description: "Ventilated and decorative panels for airflow.",
    price: 1349,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E013",
    name: "Acrylic Sheets",
    description: "Transparent, weatherproof sheets for roofing.",
    price: 1199,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E014",
    name: "Exterior Lighting",
    description: "Highlight architectural features with LED lights.",
    price: 799,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E015",
    name: "Synthetic Turf",
    description: "Low-maintenance green cover for lawns.",
    price: 949,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
  {
    id: "E016",
    name: "Canopies & Awnings",
    description: "Functional coverings for sun and rain protection.",
    price: 1599,
    image: "/categories-banner/products-categories/exterior.jpg",
  },
];



const Exteriors = () => {
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
            | Exteriors
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">Exteriors</h1>
        </div>
      </section>

      {/* Products Section */}
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Exteriors Products
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

export default Exteriors;
