"use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: "L001",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L002",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L003",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L004",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L005",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L006",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L007",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L008",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L009",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L010",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L011",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L012",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L013",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L014",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L015",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L016",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L017",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L018",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L019",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L020",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L021",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L022",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L023",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L024",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L025",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L026",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L027",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L028",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L029",
    name: "Warm White LED",
    description: "Energy-efficient light with warm tone.",
    price: 499,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L030",
    name: "Cool Daylight LED",
    description: "Bright light for offices or homes.",
    price: 599,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L031",
    name: "Smart LED Bulb",
    description: "Control brightness and color via app.",
    price: 999,
    image: "/categories-banner/products-categories/lights.jpg",
  },
  {
    id: "L032",
    name: "Vintage Filament Bulb",
    description: "Stylish retro look with modern efficiency.",
    price: 299,
    image: "/categories-banner/products-categories/lights.jpg",
  },
];

const Lights = () => {
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

      <Footer />
    </>
  );
};

export default Lights;
