"use client";

import React from "react";
import Link from "next/link";
import Disclaimer from "./Disclaimer";
import { FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
// import Disclaimer from "../disclaimer/page";

const Footer = () => {
  return (
    <>
      {/* <Disclaimer /> */}
      <Disclaimer />
      <footer className="bg-gray-900 text-gray-300 px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-2">
              <Link href="/">Search Architect</Link>
            </h2>
            <p className="text-sm leading-relaxed mb-1">
              Easily find and connect with the right agents.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Property search made effortless.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-white"
              >
                <FiInstagram className="h-5 w-5 " />
              </Link>
              <Link
                href="https://wa.me/919999999009?text=hi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaWhatsapp className="h-5 w-5 " />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-white"
              >
                <FiFacebook className="h-5 w-5 " />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-white"
              >
                <FaXTwitter className="h-5 w" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-white"
              >
                <FiLinkedin className="h-5 w-5 "/>
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div className="m-2">
            <h3 className="text-white font-semibold mb-3">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ&apos;s
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Architects Links */}
          <div className="m-2">
            <h3 className="text-white font-semibold mb-3">Search Architect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pages/search-architect" className="hover:underline">
                  Search Architect by Location
                </Link>
              </li>
              <li>
                <Link href="/pages/search-architect" className="hover:underline">
                  Search Architect by Budget
                </Link>
              </li>
              <li>
                <Link href="/pages/search-architect" className="hover:underline">
                  Search Architect by Property Type
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/architect-login"
                  className="hover:underline font-bold"
                >
                  Register as an Architect
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-10">
            <h3 className="text-white font-semibold mb-3">Subscribe</h3>
            <p className="text-sm mb-4">
              Get updates and latest offers right in your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="bg-primary text-black hover:bg-amber-950 px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Search Architect. All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
