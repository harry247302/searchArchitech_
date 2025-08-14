"use client";
import React, { useEffect } from "react";
import {
  mockUser,
  mockProjects,
  mockFeedbacks,
  mockAnalytics,
} from "./data/demo";

import {
  Briefcase,
  FolderOpen,
  Star,
  TrendingUp,
  MessageCircle,
  Edit,
  Plus,
  Calendar ,
} from "lucide-react";
import StatCard from "@/components/ui/StatsCard";
import ProjectCard from "@/components/ui/ProjectCard";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchById } from "@/app/redux/slices/architectSlice/ArchitectSlice";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {
  const completedProjects = mockProjects.filter(
    (p) => p.status === "completed"
  ).length;
  const ongoingProjects = mockProjects.filter(
    (p) => p.status === "ongoing"
  ).length;
  // const recentFeedbacks = mockFeedbacks.slice(0, 3);
  const recentProjects = mockProjects.slice(0, 2);
  const router = useRouter();
  //  const dispatch = useDispatch()
  const architect = useSelector((state) => state.architect.architects);


    const feedback = useSelector(state => state?.feedback?.fetchFeedback?.feedback)
  
  // console.log(architect);
  // useEffect(()=>{
  //   const fetchData = async ()=>{
  //     try {
  //       const res = await dispatch(fetchById())
  //       console.log(res);

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // },[])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {architect?.first_name} {architect?.last_name}!
        </h1>
        <p className="text-blue-100 mb-4">
          Here's what's happening with your projects today.
        </p>
        <div className="flex space-x-4">
          <button
            className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            onClick={() => router.push("/architect/profile")}
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </button>
          <button
            className="bg-amber-950 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-950 flex items-center"
            onClick={() => router.push("/architect/portfolio")}
          >
            <Plus size={16} className="mr-2" />
            Add Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={mockAnalytics.totalProjects}
          icon={Briefcase}
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Ongoing Projects"
          value={ongoingProjects}
          icon={FolderOpen}
          color="bg-green-500"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value={
            <span className="flex items-center">
              {mockFeedbacks?.averageRating}
              <FaStar className="ml-1 text-yellow-400" />
            </span>
          }
          icon={Star}
          color="bg-yellow-500"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Profile Views"
          value={mockAnalytics.profileViews}
          icon={TrendingUp}
          color="bg-purple-500"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
          <button className="hover:text-primary text-amber-800 font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showActions={false}
            />
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      {/* <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Feedback</h2>
          <button className="hover:text-primary text-amber-800 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {recentFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900">
                      {feedback.clientName}
                    </h4>
                    <div className="flex items-center ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{feedback.review}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Project: {feedback.projectTitle} • {feedback.date}
                  </p>
                </div>
                <button className="hover:text-primary text-amber-800 ml-4">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="space-y-4">
              {feedback?.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {feedback.visitor_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{feedback.visitor_name}</h3>
                          {/* <p className="text-sm text-gray-500">Project: {feedback.comment}</p> */}
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {feedback.date}
                          </span>
                        </div>
                      </div>
      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                      </div>
      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Was this helpful?</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Reply</button>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
};

export default Dashboard;
