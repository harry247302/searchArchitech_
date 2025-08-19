"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { MapPin, Search, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { get_architect_filter_options, GetFilteration } from "@/app/redux/slices/architectSlice/ArchitectSlice";

import * as Slider from "@radix-ui/react-slider";
import { IndianRupee } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBanner({ filters, setFilters, handleSearch }) {
  const router = useRouter();
  const dispatch = useDispatch()
  const [range, setRange] = useState([filters.min_price || 0, filters.max_price || 2000000]);
  const filter_option = useSelector(state => state?.architect?.filter_option)
  console.log(filter_option, "+++++++++++++++++++++++++++++++++++");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillClick = (skill) => {
    let updatedSkills = [];
    if (selectedSkills.includes(skill)) {
      // Remove skill if already selected
      updatedSkills = selectedSkills.filter((s) => s !== skill);
    } else {
      // Add skill if not selected
      updatedSkills = [...selectedSkills, skill];
    }

    setSelectedSkills(updatedSkills); // update local selection
    setFilters({ ...filters, skills: updatedSkills }); // send to parent filter state
  };
  console.log(selectedSkills);

  useEffect(() => {
    dispatch(get_architect_filter_options())
  }, [])


  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: "",
      maximumFractionDigits: "",
    }).format(price);
  };

  const handleChange = (value) => {
    setRange(value);
    setFilters((prev) => ({
      ...prev,
      min_price: value[0],
      max_price: value[1],
    }));
  };

  return (
    <>
      <div className="flex flex-col items-start gap-6 p-2 w-full">
        {/* <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-3 sm:ml-5 leading-tight tracking-tight text-gray-800 font-sans mb-8">
          FIND YOUR DREAM <span className="block">ARCHITECT...</span>
        </h3> */}

        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md  backdrop-blur border  rounded-3xl p-6 space-y-6">
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
              <SelectContent className="max-h-60 overflow-y-auto">
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


          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
              <Home className="w-5 h-5 mr-2 text-purple-600" />
              City
            </label>

            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, state_name: value })
              }
            >
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Select State/UT" />
              </SelectTrigger>

              <SelectContent className="max-h-60 overflow-y-auto">
                {filter_option?.state_names?.map((state, ind) => (
                  <SelectItem key={ind} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <input
              type="text"


              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
          </div>


          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
              <MapPin className="w-5 h-5 text-purple-600" /> Postal Code
            </label>
            <input
              type="text"

              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              placeholder="Postal code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
              <Home className="w-5 h-5 mr-2 text-purple-600" />
              Category
            </label>

            <Select
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  category: value === "none" ? "" : value,
                })
              }
            >
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No Category</SelectItem>
                {filter_option?.categories?.map((cat, ind) => (
                  <SelectItem key={ind} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>


          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
              <Home className="w-5 h-5 mr-2 text-purple-600" />
              Company Name
            </label>

            <Select
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  company_name: value === "none" ? "" : value,
                })
              }
            >
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No Company name</SelectItem>
                {filter_option?.company_names?.map((cat, ind) => (
                  <SelectItem key={ind} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>


          <div className="w-full max-w-xl mx-auto mt-4">
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
              <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
              Budget Range: ₹{range[0].toLocaleString()} - ₹{range[1].toLocaleString()}
            </label>

            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-6"
              min={0}
              max={5000000}
              step={1000}
              value={range}
              onValueChange={handleChange}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-primary rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-amber-950 rounded-full shadow-md hover:bg-blue-100 focus:outline-none"
                aria-label="Minimum price"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-amber-950 rounded-full shadow-md hover:bg-blue-100 focus:outline-none"
                aria-label="Maximum price"
              />
            </Slider.Root>
          </div>

          <div className="flex flex-wrap gap-2">
            {filter_option?.skills?.map((skill, ind) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <p
                  key={ind}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors duration-200
              ${isSelected
                      ? "bg-[#be8e5a] border-[#be8e5a] text-white"
                      : "bg-gray-50 border border-[#be8e5a] text-gray-700"
                    }`}
                >
                  {skill}
                </p>
              );
            })}
          </div>



          {/* Search Button */}
          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-amber-900 text-white rounded-xl px-6 py-3"
            >
              <Search className="w-5 h-5" />
              Search Properties
            </Button>
          </div>
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