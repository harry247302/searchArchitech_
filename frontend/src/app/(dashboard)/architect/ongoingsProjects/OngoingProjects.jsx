"use client"
import React, { useEffect, useState } from 'react';
import { mockProjects } from '../data/demo';
import ProjectCard from '@/components/ui/ProjectCard';
import { useDispatch } from 'react-redux';
import { get_projects_by_architect } from '@/app/redux/slices/projectSlice/ProjectSlice';

const OngoingProjects = () => {

  const dispatch = useDispatch()
  const [projects, setProjects] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(get_projects_by_architect())
        console.log(res, "+++++++++++++++++++++++++--------++++");

        if (res?.meta?.requestStatus === "fulfilled") { setProjects(res?.payload) }
      } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ongoing Projects</h1>
            <p className="text-gray-600 mt-1">Track and manage your active projects</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
            {/* {ongoingProjects.length} Active Projects */}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <ProjectCard
              project={project}
            // onMessage={handleMessageClient}
            // showActions={false}
            />


            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Project Timeline</h4>
                <span className="text-sm text-gray-500">
                  {project?.start_date} - {project.end_date}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progress: 65%</span>
                <span>Due in 45 days</span>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Client: {project.location}</p>
                <p className="text-sm text-gray-600">{project.status}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  // onClick={() => handleMarkComplete(project.id)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Mark Complete
                </button>
                <button
                  // onClick={() => handleMessageClient(project)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Message Client
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {ongoingProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-gray-500 text-lg">No ongoing projects</div>
          <p className="text-gray-400 mt-2">Your active projects will appear here</p>
        </div>
      )} */}
    </div>
  );
};

export default OngoingProjects;
