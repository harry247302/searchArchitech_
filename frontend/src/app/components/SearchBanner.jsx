"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { IndianRupee, MapPin, Search, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetFilteration } from "@/app/redux/slices/architectSlice/ArchitectSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

export default function SearchBanner() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    min_price: "",
    max_price: "",
    state_name: "",
    category: "",
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  const dispatch = useDispatch();
  const handleSearch = async () => {
    const res = await dispatch(GetFilteration(filters));
    console.log(res, "+-+++++++++++++++++++++++++++");

    if (res?.meta?.requestStatus === "fulfilled") {
      router.push(`/pages/search-architect`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-6 p-6 w-full">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-3 sm:ml-5 leading-tight tracking-tight text-gray-800 font-sans mb-8">
          FIND YOUR DREAM <span className="block">ARCHITECT...</span>
        </h3>

        <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur border border-gray-300 rounded-3xl shadow-md p-6 space-y-6">
          {/* State & Property Type */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* State Selector */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                State/UT
              </label>
              <Select
                onValueChange={(value) =>
                  setFilters({ ...filters, state_name: value })
                }
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select State/UT" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Andhra Pradesh",
                    "Arunachal Pradesh",
                    "Assam",
                    "Bihar",
                    "Chhattisgarh",
                    "Goa",
                    "Gujarat",
                    "Haryana",
                    "Himachal Pradesh",
                    "Jharkhand",
                    "Karnataka",
                    "Kerala",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Manipur",
                    "Meghalaya",
                    "Mizoram",
                    "Nagaland",
                    "Odisha",
                    "Punjab",
                    "Rajasthan",
                    "Sikkim",
                    "Tamil Nadu",
                    "Telangana",
                    "Tripura",
                    "Uttar Pradesh",
                    "Uttarakhand",
                    "West Bengal",
                    "Andaman and Nicobar",
                    "Chandigarh",
                    "Dadra and Nagar Haveli and Daman and Diu",
                    "Delhi",
                    "Jammu and Kashmir",
                    "Ladakh",
                    "Lakshadweep",
                    "Puducherry",
                  ].map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type Selector */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <Home className="w-5 h-5 mr-2 text-purple-600" />
                Category
              </label>
              <Select
                onValueChange={(value) =>
                  setFilters({ ...filters, category: value })
                }
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="mixed-use">Mixed-use</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-600 mb-1">
                  Budget
                </label> */}

              <label className="flex items-center text-lg font-semibold text-gray-700">
                <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                Max Range (INR)
              </label>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    max_price: Number(e.target.value),
                  }))
                }
                placeholder="e.g. 1500000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-600 mb-1">
                  Budget
                </label> */}

              <label className="flex items-center text-lg font-semibold text-gray-700">
                <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                Min Range (INR)
              </label>
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    min_price: Number(e.target.value),
                  }))
                }
                placeholder="e.g. 1500000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget Range */}

            {/* <div className="grid grid-cols-1 gap-4"> */}
            {/* <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Min Budget
                </label>
                <input
                  type="number"
                  min={50000}
                  max={1500000}
                  step={10000}
                  value={filters.minBudget}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minBudget: Number(e.target.value),
                    }))
                  }
                  placeholder="e.g. 200000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

            {/* </div> */}
            <div className="flex justify-items-center mt-7">
              <Button
                size="lg"
                onClick={handleSearch}
                className="flex items-center gap-2 bg-primary hover:bg-amber-900 text-white rounded-xl px-6 py-3"
              >
                <Search className="w-5 h-5" />
                Search Architects
              </Button>
            </div>
          </div>

          {/* Search Button */}
        </div>

        {/* Slider Styles */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
          }

          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
          }
        `}</style>
      </div>
    </>
  );
}
