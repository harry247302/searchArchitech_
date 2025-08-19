"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { demoProperties } from "@/static-data/properties";
import Link from "next/link";
import {
  fetchAllArchitects,
  GetFilteration,
} from "../redux/slices/architectSlice/ArchitectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../components/ui/breadcrumb";
import SearchBanner from "../components/SearchAllFilters";


const PropertyResults = () => {
  const dispatch = useDispatch();
  const [ArchitechFilter, setArchitechFilter] = useState([]);
  // const data = useSelector(state=>state)
  // console.log(data);
  const [filters, setFilters] = useState({
    min_price: null,
    max_price: null,
    category: null,
    state_name: null,
    propertyType: null,
    city: null,
    apartment: null,
    street_address: null,
    skills: null,
    company_name: null
  });

  const handleSearch = async () => {
    // console.log(filters, "---------------------------");
    const res = await dispatch(GetFilteration(filters));
    // console.log(res, "++++++++++++++++++++++++");
    if (res?.meta?.requestStatus === "fulfilled") {
      setArchitechFilter(res?.payload?.data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();


  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBudgetRange = () => {
    return `${formatPrice(filters.minBudget)} - ${formatPrice(
      filters.maxBudget
    )}`;
  };

  return (
    <>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <aside className="mt-15 w-[30%] p-4 sticky top-0 h-screen overflow-y-auto">
          <SearchBanner
            filters={filters}
            setFilters={setFilters}
            handleSearch={handleSearch}
          />

        </aside>
        <div className="mt-15 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            {/* <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </button> */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
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
                    {/* <BreadcrumbSeparator /> */}
                    {/* <BreadcrumbItem>
      <BreadcrumbPage>architects</BreadcrumbPage>
    </BreadcrumbItem> */}
                  </BreadcrumbList>
                </Breadcrumb>
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Search Results
              </h1>
              {/* <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {formatBudgetRange()}
                </div>
                {filters.location !== "All Locations" && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {filters.location}
                  </div>
                )}
                {filters.propertyType !== "All Types" && (
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {filters.propertyType}
                  </div>
                )}
              </div> */}
              <p className="text-gray-600 mt-3">
                {/* Found <span className="font-semibold text-blue-600">{filteredProperties.length}</span> properties matching your criteria */}
              </p>
            </div>
          </div>

          {/* Results Grid */}
          {ArchitechFilter.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ArchitechFilter.map((architect) => (
                <div
                  key={architect.uuid}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={architect.profile_url}
                      // alt={architect.first_name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {/* <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {architect.category}
                      </span>
                    </div> */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                        ₹ {architect.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <Link href={`search-architect/${architect.uuid}`}>
                        <button className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          More Details
                        </button>
                      </Link>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {architect.first_name} {architect.last_name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      <strong>category</strong> : {architect.category}
                    </p>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {architect.city_name} {architect.state_name} {architect.postal_code}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {/* <Bed className="w-4 h-4 mr-1" /> */}
                          <span>{architect.company_name}</span>
                        </div>
                        <div className="flex items-center">
                          {/* <Bath className="w-4 h-4 mr-1" /> */}
                          <span>
                            {new Date(architect.created_at).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {/* <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>{architect.area} ft²</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria to find more properties.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Modify Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PropertyResults;
