"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import toast from "react-hot-toast";
import { submitForm } from "../redux/slices/contactSlice/ContactSlice";
import { useDispatch } from "react-redux";

export default function ContactUs() {
  const [form, setForm] = useState({ first_name: '', last_name: '', message: '', email: '', phone: '' })
  const initialForm = {
  first_name: '',
  last_name: '',
  message: '',
  email: '',
  phone: ''
};

 const [loading, setLoading] = useState(false);

const dispatch = useDispatch()
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); 
  try {
    const res = await  dispatch(submitForm(form)) ;
    if (res?.payload?.message) {
      toast.success(res?.payload?.message);
      setForm(initialForm); 
    }
  } catch (error) {
    console.log(error);
    toast.error("Submission failed");
  } finally {
    setLoading(false); 
  }
};


  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-white text-gray-800">
        <section className="relative h-64 md:h-80 w-full mb-10">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/banner/breadcrumb.jpg"
              alt="Contact Us Banner"
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
              | Contact Us
            </p>
            <h1 className="text-4xl">Contact Us</h1>
          </div>
        </section>
        {/* Top Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Left Email */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md flex items-center justify-center">
            <div className="text-center">
              <Mail className="mx-auto h-8 w-8 text-primary mb-3" />
              <p className="text-lg font-medium">Email us at</p>
              <p className="text-sm mt-1 text-gray-700">
                <a href="mailto:+919999999009">+91 9999 999 009</a>
              </p>
            </div>
          </div>

          {/* Right Phone */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md flex items-center justify-center">
            <div className="text-center">
              <Phone className="mx-auto h-8 w-8 text-primary mb-3" />
              <p className="text-lg font-medium">Call us at</p>
              <p className="text-sm mt-1 text-gray-700">
                <a href="tel:+919999999009">+91 9999 999 009</a>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto border-2 p-6 rounded-sm mb-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Keep in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                value={form.first_name}
                onChange={(e) => setForm((prev) => ({ ...prev, first_name: e.target.value }))}
                required
                placeholder="First Name"
              />
              <Input
              value={form.last_name}
                onChange={(e) => setForm((prev) => ({ ...prev, last_name: e.target.value }))}
                placeholder="Last Name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
              value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
                type="email"
                placeholder="Email Address"
              />
              <Input
              value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                required
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            <Textarea
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              required
              value={form.message}
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
