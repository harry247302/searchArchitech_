"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const faqs = [
  {
    question: "What is Search Architect?",
    answer:
      "Search Architect is an online platform that connects customers with top architects across various categories.",
  },
  {
    question: "How can architects join the platform?",
    answer:
      "Architects can register and list their services, portfolio, contact information, and pricing through a simple signup process.",
  },
  {
    question: "Is this service free for users?",
    answer:
      "Yes, it is completely free for users looking to connect with architects.",
  },
  {
    question: "What types of projects are supported?",
    answer:
      "The platform supports residential, commercial, industrial, institutional, and renovation/remodeling projects.",
  },
  {
    question: "Can I contact architects directly?",
    answer:
      "Yes, each listed architect provides direct contact options along with their service and work details.",
  },
];

export default function Faq() {
  return (
    <>
    {/* <Navbar /> */}
      <div className="bg-white text-gray-800">
        <section className="relative h-64 md:h-80 w-full mb-10">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/banner/breadcrumb.jpg"
              alt="Frequently Asked Questions"
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
                className="text-2xl text-primary hover:text-amber-300"
              >
                Home
              </Link>{" "}
              | Faq&apos;s
            </p>
            <h1 className="text-4xl">Frequently Asked Questions</h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-10">
            Frequently Asked Questions For Vendors
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-gray-300 rounded-md"
              >
                <AccordionTrigger
                  className="text-left px-4 py-3 text-base md:text-lg font-medium transition-all 
                           hover:bg-gray-50 rounded-md 
                           data-[state=open]:bg-primary 
                           data-[state=open]:text-white"
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent
                  className="px-4 pb-4 text-sm md:text-base text-gray-600 
                           overflow-hidden
                           data-[state=closed]:animate-accordion-up 
                           data-[state=open]:animate-accordion-down
                           p-8"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl md:text-4xl text-center mb-10">
            Frequently Asked Questions For Customer
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-gray-300 rounded-md"
              >
                <AccordionTrigger
                  className="text-left px-4 py-3 text-base md:text-lg font-medium transition-all 
                hover:bg-gray-50 rounded-md 
                data-[state=open]:bg-primary 
                data-[state=open]:text-white"
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent
                  className="px-4 pb-4 text-sm md:text-base text-gray-600 
                           overflow-hidden
                           data-[state=closed]:animate-accordion-up 
                           data-[state=open]:animate-accordion-down
                           p-8"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <hr className="m-12" />
        <section className="max-w-4xl mx-auto p-4 rounded-sm">
          <h2 className="text-3xl font-bold text-center mb-10">
            Do You Have Any Questions?
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle form submission
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input required placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input required type="email" placeholder="Email Address" />
              <Input required type="tel" placeholder="Phone Number" />
            </div>
            <Textarea
              required
              placeholder="Your Message"
              rows={8}
              className="min-h-[250px]"
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-primary hover:bg-amber-950 text-black"
              >
                Submit
              </Button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}
