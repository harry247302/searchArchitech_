// app/architects/[id]/page.jsx

import FeedBack from "@/app/web-pages/Feedback";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin, Bed, Bath, Square } from "lucide-react";
import { demoProperties } from "@/static-data/properties";

export const dynamic = 'force-dynamic';

export default async function ArchitectDetails({ params }) {
  const id = Number(params?.id);
  const property = demoProperties.find((item) => item.id === id);

  if (!property) {
    return <div className="p-6 text-red-600">Property not found.</div>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6 m-10 max-w-7xl mx-auto">
        <div className="w-full mt-10 p-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              {/* Profile Image and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={property.image}
                    alt="property"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {property.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Architect • {property.experience} years experience
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">{property.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">{property.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-500 mr-3" />
                  <span className="text-gray-700">{property.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Social Links
                </h3>
                <div className="space-y-3">{/* dynamic social links */}</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Bio
                </h3>
                <p className="text-gray-700">{property.description}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Skills & Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Experience
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Years of Experience:</span>
                  <span className="font-medium text-gray-900">
                    {property.experience} years
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {property.averageRating}⭐
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Property Views</p>
                    <p className="text-2xl font-bold text-gray-900">1,240</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Feedback */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 p-4 rounded-lg">
            <FeedBack />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
