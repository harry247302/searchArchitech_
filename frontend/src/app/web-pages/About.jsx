"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";


export default function About() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-white text-gray-800">
        {/* Top Banner with Nav */}
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
                className="text-2xl text-primary hover:text-amber-300"
              >
                Home
              </Link>{" "}
              | About Us
            </p>
            <h1 className="text-4xl">About Us</h1>
          </div>
        </section>

        {/* About Text & Image Section */}
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="w-full">
            <Image
              src="/banner/about-us.png"
              alt="Architect illustration"
              width={600}
              height={400}
              className="rounded-xl w-full object-cover shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div>
            <h2 className="text-4xl md:text-4xl font-bold mb-4">About us</h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              <strong>Search Architect</strong> is an online platform that
              intends to bring the topmost architects and people searching for
              such architects under one roof.
            </p>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              <strong>Search Architect’s</strong> aim is to cut down the hassle
              for the customers, who are looking for professional services of
              architects for their various projects like{" "}
              <strong>
                Residential, Industrial, Institutional, Renovation &
                Remodelling, etc.
              </strong>
            </p>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              And at the same time, we also want to provide architects a
              platform where they could list all their services along with their
              previous work portfolio, contact details, as well as their prices
              so when a potential client contacts them, they are already well
              aware of their work and their work style beforehand and they are
              hand-picked by them.
            </p>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              Thus, this creates more transparency and awareness for both
              parties involved.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Apart from this, Search Architect also facilitates access to a
              huge network of vendors supplying essential building components.
              From luxurious wooden flooring to exquisite wallpapers,
              sophisticated lighting fixtures, premium stone and marble,
              exterior facades, and a multitude of other products essential for
              a complete building project.
            </p>
          </div>
        </section>

        {/* Call-to-Action Banner */}
        <section className="relative py-12 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <Image
                src="/banner/want-to-buy.jpg"
                alt="Join as Architect"
                width={600}
                height={300}
                className="rounded-lg w-full object-cover shadow-md"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-semibold mb-4">
                Are you an Architect? Join Us Today!
              </h3>
              <p className="mb-6 text-sm md:text-base">
                Create your profile, showcase your projects, and connect with
                thousands of clients.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-amber-950 text-black"
              >
                <Link href="/login">Register as an Architect</Link>
              </Button>
            </div>
          </div>
          <Awards />
        </section>
      </div>
      <Footer />
    </>
  );
}
