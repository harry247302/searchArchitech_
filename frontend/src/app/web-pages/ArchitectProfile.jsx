"use client";
// import FeedBack from "@/app/web-pages/Feedback";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { MapPin, Bed, Bath, Square } from "lucide-react";
// import { demoProperties } from "@/static-data/properties";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchProfileById } from "../redux/slices/architectSlice/ArchitectSlice";
import { useEffect, useState } from "react";
import { TfiReceipt } from "react-icons/tfi";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import { toast } from "react-hot-toast";

import {
  MapPin,
  ArrowRight,
  ChevronDown,
  Globe,
  Copy,
  Share2,
  Star,
  Edit2,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  FileText,
  MailIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FeedBack from "./Feedback";

export default function ArchitectProfile() {
  // time open useEffect
  const projects = useSelector(state => state)
  console.log(projects, "||||||||||||||||||||||||||||||||||||||||||");

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Example: Open from 9:00 am to 9:00 pm (21:00)
    const openingHour = 9;
    const closingHour = 21;

    const isCurrentlyOpen =
      (currentHour > openingHour && currentHour < closingHour) ||
      (currentHour === openingHour && currentMinute >= 0) ||
      (currentHour === closingHour && currentMinute === 0);

    setIsOpen(isCurrentlyOpen);
  }, []);

  // share model
  const [showModal, setShowModal] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const phoneControls = useAnimation();
  const mailControls = useAnimation();

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.5 },
  };

  const [propertyType, setPropertyType] = useState("Residential");
  const params = useParams();

  const [architect, setarchitect] = useState();

  const architectId = params?.id; // assuming your route is /architect-details/[id]
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchArchitect = async () => {
      try {
        const res = await dispatch(fetchProfileById(architectId));
        console.log(res, "---------------------");
        if (res?.meta?.requestStatus === "fulfilled") {
          setarchitect(res?.payload?.architect);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchArchitect();
  }, []);

  // review function

  const [hoveredStars, setHoveredStars] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const router = useRouter();

  const handleMouseEnter = (index) => {
    setHoveredStars(index);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  // const handleClick = (index) => {
  //   setSelectedStars(index);
  //   router.push("/feedback");
  // };

  // const handleClick = (index) => {
  //   setSelectedStars(index);
  //   router.push(`/feedback/${architect?.uuid}`);
  // };

  console.log(architect, "////////////");

  const catalogue = [
    {
      title: "Architect for Bungalow",
      description: "An architect for a bungalow specializes in...",
    },
    {
      title: "Architect for Villa",
      description: "An architect for a villa specializes in...",
    },
    {
      title: "Architect for Residential",
      description: "Residential architecture focuses on...",
    },
  ];

  const photos = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ];

  return (
    <>
      <div className="min-h-screen flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-xl flex flex-col lg:flex-row gap-8">
          {/* Left: Main Content */}
          <div className="w-full lg:w-3/4 bg-white text-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow">
            <span>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/pages/search-architect">
                      search architects
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {architect?.first_name} {architect?.last_name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </span>

            {/* Architect Header */}
            <div className="relative bg-gray-100 border-b rounded-t-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded overflow-hidden">
                    {architect?.profile_url && (
                      <img
                        src={architect.profile_url}
                        alt="Architect Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {architect?.first_name} {architect?.last_name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        4.4 ★
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                        Verified
                      </span>
                      <span className="text-gray-600">
                        {architect?.experience} Years in Business
                      </span>
                    </div>
                    <p className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {architect?.city} {architect?.state_name} • Open until
                      9:00 PM
                    </p>
                    <p className="flex items-center text-sm text-gray-500 mt-1">
                      <TfiReceipt className="w-4 h-4 mr-1" />
                      {architect?.gst_no}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-4">
                      <button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition w-max duration-500 ease-in">
                        Enquire Now
                      </button>

                      <button
                        className="flex items-center gap-2 border border-green-500 text-white px-4 py-2 rounded  bg-green-500 transition"
                        onMouseEnter={() => phoneControls.start(shakeAnimation)}
                      >
                        <motion.div
                          animate={{
                            x: [0, -3, 3, -3, 3, 0],
                            rotate: [0, 3, -3, 3, -3, 0], // slight tilt effect
                            transition: {
                              duration: 1,
                              repeat: Infinity,
                              repeatType: "loop",
                            },
                          }}
                          whileHover={{
                            x: [0, -8, 8, -8, 8, 0],
                            rotate: [0, 6, -6, 6, -6, 0], // more exaggerated on hover
                            transition: {
                              duration: 2,
                            },
                          }}
                        >
                          <Phone className="w-5 h-5" />
                        </motion.div>

                        {architect?.phone_number}
                      </button>

                      <button
                        className="flex items-center gap-2 border border-blue-500 text-white px-4 py-2 rounded bg-blue-500  transition"
                        onMouseEnter={() => mailControls.start(shakeAnimation)}
                      >
                        <motion.div animate={mailControls}>
                          <Mail className="w-5 h-5" />
                        </motion.div>
                        {architect?.email}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-around border-b text-sm font-medium bg-white py-2 overflow-x-auto">
              {[
                { label: "Overview", id: "overview" },
                // { label: "Catalogue", id: "catalogue" },
                { label: "Quick Info", id: "quick" },
                { label: "Photos", id: "photos" },
                { label: "Reviews", id: "reviews" },
              ].map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.id}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  spy={true}
                  activeClass="text-primary font-semibold"
                  className="px-3 py-1 cursor-pointer whitespace-nowrap hover:text-primary transition"
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* Sections */}
            {/* <Element name="catalogue">
              <section className="py-6">
                <h2 className="text-xl font-semibold mb-4">Catalogue</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {catalogue.map((item, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-xl shadow-sm bg-gray-50"
                    >
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <button className="text-primary font-medium hover:underline">
                        Ask for Price
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </Element> */}

            <Element name="quick">
              <section className="py-6 border-t">
                <h2 className="text-xl font-semibold mb-2">
                  Quick Information
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Tech-enabled construction company offering comprehensive
                  services, real-time project tracking, and innovative design
                  tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div>
                    <p>
                      <strong>Company Name:</strong> {architect?.company_name}
                    </p>
                    <p>
                      <strong>Established:</strong> 2018
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Properties Served:</strong> {architect?.category}
                    </p>
                  </div>
                </div>
              </section>
            </Element>

            <Element name="photos">
              <section className="py-6 border-t">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {photos.map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      alt={`Photo ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg border shrink-0"
                    />
                  ))}
                </div>
              </section>
            </Element>

            {/* review section */}
            <Element name="reviews">
              <section className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  Reviews & Rating
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white text-xl px-4 py-2 rounded-full font-bold">
                    4.4
                  </div>
                  <div>
                    <div className="font-semibold text-lg">92 Ratings</div>
                    <p className="text-gray-500 text-sm">
                      {architect?.company_name} rating index based on 92 ratings across the web
                    </p>
                  </div>
                </div>

                {/* <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">
                    Finish your review
                  </h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(i)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${i <= (hoveredStars || selectedStars)
                            ? "text-orange-500 fill-orange-500"
                            : "text-gray-400"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push(`/feedback/${architect?.uuid}`)}
                    className="mt-3 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
                  >
                    Add a Review
                  </button>
                </div> */}
                <FeedBack architect={architect} />
              </section>
            </Element>

          </div>

          {/* Right: Feedback Sidebar */}
          <div className="w-full lg:w-1/4">
            <section className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-4 sm:p-6 text-sm text-gray-800">
              {/* Contact */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-lg">Contact</h2>
                  <a
                    href="tel:09035132917"
                    className="text-Stone-700 flex items-center space-x-1 mt-1"
                  >
                    <motion.div
                      animate={{
                        x: [0, -3, 3, -3, 3, 0],
                        rotate: [0, 3, -3, 3, -3, 0], // slight tilt effect
                        transition: {
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "loop",
                        },
                      }}
                      whileHover={{
                        x: [0, -8, 8, -8, 8, 0],
                        rotate: [0, 6, -6, 6, -6, 0], // more exaggerated on hover
                        transition: {
                          duration: 0.4,
                        },
                      }}
                    >
                      <Phone className="w-5 h-5" />
                    </motion.div>

                    <span>{architect?.phone_number}</span>
                  </a>
                  <a
                    href="tel:09035132917"
                    className="text-Stone-700 flex items-center space-x-1 mt-1"
                  >
                    <MailIcon size={16} />
                    <span>{architect?.email}</span>
                  </a>
                </div>

                {/* Address */}
                <div>
                  <h2 className="font-semibold text-lg">Address</h2>
                  <p className="mt-1 text-gray-600">
                    {architect?.apartment}, {architect?.city},{" "}
                    {architect?.state_name}
                  </p>
                  <div className="flex items-center gap-6 mt-2 text-Stone-700 font-medium">
                    {/* <button className="flex items-center gap-1 cursor-pointer">
                      <Globe size={16} /> Get Directions
                    </button> */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `   ${architect?.apartment}, ${architect?.city}, ${architect?.state_name}`
                        );
                        toast.success("Address copied to clipboard!");
                      }}
                      className="flex items-center gap-2 text-Stone-700 cursor-pointer"
                    >
                      <Copy size={16} /> Copy
                    </button>
                  </div>
                </div>

                {/* Timings */}
                {/* <div className="flex items-center text-green-600">
                  <Clock size={16} className="mr-1" />
                  <span>Open until 9:00 pm</span>
                  <ChevronDown size={14} className="ml-auto text-gray-500" />
                </div> */}

                <div className="flex items-center text-green-600">
                  <Clock size={16} className="mr-1" />
                  <span className={isOpen ? "text-green-600" : "text-red-600"}>
                    {isOpen ? "Open until 9:00 pm" : "Closed"}
                  </span>
                  <ChevronDown size={14} className="ml-auto text-gray-500" />
                </div>

                {/* <button className="text-Stone-700 flex items-center gap-1 cursor-pointer">
                  <Edit2 size={16} /> Suggest New Timings
                </button> */}

                {/* Enquiry options */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${architect?.email}`}
                    className="flex items-center gap-2 text-Stone-700 cursor-pointer"
                  >
                    <button className="flex items-center gap-2 text-Stone-700 cursor-pointer">
                      <Mail size={16} /> Send Enquiry by Email
                    </button>
                  </a>
                  <button className="flex items-center gap-2 text-Stone-700 cursor-pointer">
                    <MessageSquare size={16} /> Get info via SMS/Email
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    className="flex items-center gap-2 text-Stone-700 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <Share2 size={16} /> Share
                  </button>

                  {/* Modal */}
                  {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-lg animate-fade-in">
                        {/* Close Button */}
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                          <X size={20} />
                        </button>

                        {/* Title and Subtitle */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                          Share With Friends
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                          Select from the options below
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-6">
                          {/* Facebook */}
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              shareUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center"
                          >
                            <div className="bg-blue-600 text-white rounded-full p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99h-2.3v-2.88h2.3v-2.2c0-2.27 1.35-3.52 3.42-3.52.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.69-1.47 1.4v1.91h2.5l-.4 2.88h-2.1v6.99A10 10 0 0 0 22 12z" />
                              </svg>
                            </div>
                            <span className="mt-1 text-sm text-gray-700">
                              Facebook
                            </span>
                          </a>

                          {/* WhatsApp */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                              shareUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center"
                          >
                            <div className="bg-green-500 text-white rounded-full p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.52 3.48A11.76 11.76 0 0 0 12 0a11.89 11.89 0 0 0-10.3 17.69L0 24l6.47-1.69A11.82 11.82 0 0 0 12 24a11.76 11.76 0 0 0 8.52-20.52ZM12 22a10 10 0 0 1-5.29-1.47l-.38-.23-3.84 1 1-3.73-.25-.38A9.84 9.84 0 1 1 12 22Zm5.34-7.71c-.29-.15-1.7-.84-1.96-.94s-.46-.15-.65.15-.75.94-.92 1.14-.34.22-.63.07a8.13 8.13 0 0 1-2.4-1.47 9 9 0 0 1-1.65-2.07c-.17-.29 0-.45.13-.6s.29-.34.44-.52a2 2 0 0 0 .3-.5.56.56 0 0 0 0-.52c-.08-.15-.65-1.56-.9-2.15s-.48-.5-.65-.51h-.56a1.08 1.08 0 0 0-.77.36 3.2 3.2 0 0 0-1 2.38c0 1.4 1 2.76 1.17 2.95s2.07 3.32 5 4.52a16.2 16.2 0 0 0 1.61.59 3.83 3.83 0 0 0 1.72.11 2.9 2.9 0 0 0 1.9-1.33 2.34 2.34 0 0 0 .16-1.34c-.06-.11-.26-.18-.55-.33Z" />
                              </svg>
                            </div>
                            <span className="mt-1 text-sm text-gray-700">
                              WhatsApp
                            </span>
                          </a>

                          {/* Copy Link */}
                          <button
                            onClick={handleCopyLink}
                            className="flex flex-col items-center text-center"
                          >
                            <div className="bg-purple-500 text-white rounded-full p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M3.9 12a5.1 5.1 0 0 1 5.1-5.1h3a1 1 0 0 1 0 2h-3a3.1 3.1 0 1 0 0 6.2h3a1 1 0 0 1 0 2h-3A5.1 5.1 0 0 1 3.9 12Zm5.1 1h6a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm6-6h-3a1 1 0 0 1 0-2h3a5.1 5.1 0 1 1 0 10.2h-3a1 1 0 0 1 0-2h3a3.1 3.1 0 0 0 0-6.2Z" />
                              </svg>
                            </div>
                            <span className="mt-1 text-sm text-gray-700">
                              Copy Link
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="flex items-center gap-2 text-Stone-700 cursor-pointer">
                    <Star size={16} /> Tap to rate
                  </button>
                  {/* <button className="flex items-center gap-2 text-Stone-700 cursor-pointer">
                    <Edit2 size={16} /> Edit this Listing
                  </button> */}
                  {/* <button className="flex items-center gap-2 text-Stone-700 cursor-pointer">
                    <Globe size={16} /> Visit our Website
                  </button> */}
                </div>

                {/* <div>
                  <button className="flex items-center gap-2 text-Stone-700">
                    <Globe size={16} /> Follow us
                    <ChevronDown size={14} className="ml-auto text-gray-500" />
                  </button>
                </div> */}

                <div className="text-gray-500 flex items-center gap-2 mt-2">
                  <FileText size={16} />
                  <span>GSTIN: {architect?.gst_no}</span>
                </div>
              </div>

              {/* Enquiry Box */}
              <div className="border-t mt-6 pt-4 space-y-4">
                <p className="text-gray-700 text-sm">
                  Get the List of{" "}
                  <span className="text-Stone-700 font-medium">Architects</span>
                  <br />
                  <span className="text-xs text-gray-500">
                    We’ll send you contact details in seconds for free
                  </span>
                </p>

                <div>
                  <label className="block text-sm mb-1 font-medium">
                    What type of Property do you want to design?
                  </label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="Residential"
                        checked={propertyType === "Residential"}
                        onChange={() => setPropertyType("Residential")}
                        className="accent-Stone-700"
                      />
                      Residential
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="Commercial"
                        checked={propertyType === "Commercial"}
                        onChange={() => setPropertyType("Commercial")}
                        className="accent-Stone-700"
                      />
                      Commercial
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <button className="w-full bg-Stone-700 hover:bg-blue-700 text-white rounded py-2 text-sm font-semibold transition">
                  Send Enquiry &nbsp; &raquo;&raquo;
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
