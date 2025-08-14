"use client";

import { addProject } from '@/app/redux/slices/projectSlice/ProjectSlice';
import { SimpleEditor } from '@/app/simple/page';
// import { useAddProjectMutation } from '@/app/redux/slices/projectSlice/ProjectSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AddProject = () => {
  const dispatch = useDispatch();
  const architech = useSelector(state => state?.architect?.architects)

  const [loading, setLoading] = useState(false);


  // const [addProject, {isLoading, error, data}] = useAddProjectMutation()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    start_date: '',
    end_date: '',
    budget: 0,
    location: "",
    images: [],
    videos: [],
    status: "",
  });

  const router = useRouter();

  // Updated handleChange to work with both events & direct values
const handleChange = (eOrValue, nameFromEditor) => {
  // If coming from SimpleEditor
  if (nameFromEditor) {
    setFormData((prev) => ({
      ...prev,
      [nameFromEditor]: eOrValue, // val from editor
    }));
    return;
  }

  // If coming from normal input event
  const { name, files, value } = eOrValue.target;
  if (files) {
    setFormData((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};





  // const handleChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: Array.from(files), // store actual File objects
  //     }));
  //   } else {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const form = new FormData();
      form.append("title", formData.title || "");
      form.append("description", formData.description || "");
      form.append("category", formData.category || "");
      form.append("location", formData.location || "");
      form.append("start_date", formData.start_date || "");
      form.append("end_date", formData.end_date || "");
      form.append("budget", formData.budget || "");
      form.append("status", formData.status || "");

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => form.append("images", file));
      }

      if (formData.videos && formData.videos.length > 0) {
        formData.videos.forEach((file) => form.append("videos", file));
      }

      const res = await dispatch(addProject(form));
      console.log(res);

      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success("Project added successfully!");
        router.push('portfolio')
        // Reset formData here if you want
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to add project. Please try again.");
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };



  return (
    <>
      <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Project Title</label>
            <input
              placeholder="Project title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#be8e5a]"
              required
            />
          </div>

          {/* Description */}
          {/* <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Project description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#be8e5a]"
              required
            />
          </div> */}
          <div>
  <label className="block mb-1 font-medium">Description</label>
  <SimpleEditor
    name="description"
    value={formData.description}
    onChange={(val) => handleChange(val, "description")}
  />
</div>

          {/* Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                placeholder="Project category"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                placeholder="Project status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* Budget & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Budget</label>
              <input
                type="number"
                placeholder="Project budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                placeholder="Project location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                placeholder="Start date"
                name="start_date"
                // value={formData.year}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              // required
              />
            </div>


<div>
  <label className="block mb-1 font-medium">End Date</label>
  <input
    type="date"
    placeholder="End date"
    name="end_date"
    value={formData.end_date || ""}
    onChange={handleChange}
    disabled={formData.status === "in-progress"}
    required={formData.status === "completed"}
    className={`w-full border rounded px-3 py-2 ${
      formData.status === "in-progress"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-black"
    }`}
  />
</div>


          </div>

          {/* Location */}


          {/* Image URL & Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Images</label>
              <input
                multiple
                type="file"
                placeholder="Project Images"
                name="images"
                // value={formData.images}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Videos</label>
              <input
                multiple
                type="file"
                placeholder="Project video"
                name="videos"
                // value={formData.videos}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Submit */}
          {/* <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Project
          </button>
        </div> */}
          <div className="flex flex-cols justify-center items-center sm:grid-cols-2 gap-4">
            <div>
              <button
                type="button"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                onClick={() => router.push("/architect/portfolio")}
              >
                Cancel
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`btn-submit ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Submitting..." : "Submit Project"}
              </button>

            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProject;