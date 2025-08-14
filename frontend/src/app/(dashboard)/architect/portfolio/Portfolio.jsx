"use client"
import React, { useEffect, useState } from 'react';
import { mockProjects } from '../data/demo';
import { Plus, Filter } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import { useRouter } from 'next/navigation';
import { delete_projects_by_architect, get_projects_by_architect } from '@/app/redux/slices/projectSlice/ProjectSlice';
import { useDispatch } from 'react-redux';

const Portfolio = () => {

  const router = useRouter()
  const [projects, setProjects] = useState();
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch()

  // const filteredProjects =
  //   filter === 'all'
  //     ? projects
  //     : projects.filter((project) => project.type === filter);


  const filteredProjects =
  filter === 'all'
    ? projects
    : filter === 'In Progress'
      ? projects.filter((project) =>
          project.status?.toLowerCase() === 'in-progress'
        )
      : projects.filter(
          (project) => project.type?.toLowerCase() === filter.toLowerCase()
        );
      
  // const handleDeleteProject = async (id) => {
  //   const res = await dispatch(delete_projects_by_architect())
  //   console.log(res, ":::::::::::::::::::::::::::::::::::::::::::::::");

  // };

  const handleEditProject = (project) => {
    console.log('Edit project:', project);
  };
  const projectTypes = ['all', 'Residential', 'Commercial', 'Interior', 'Landscape', "In Progress"];

  const fetchData = async () => {
    try {
      const res = await dispatch(get_projects_by_architect())        
      if (res?.meta?.requestStatus === "fulfilled") {
        setProjects(res?.payload)
      }
    } catch (error) {
      console.log();
    }
  }
  useEffect(() => { 
    fetchData()
  }, [])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
            <p className="text-gray-600 mt-1">Showcase your best architectural work</p>
          </div>
          <button
            onClick={() => router.push("/architect/add-project")}
            // onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add New Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          <div className="flex space-x-2">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            fetchData={fetchData}
            onEdit={handleEditProject}
            // onDelete={handleDeleteProject}
          />
        ))}
      </div>

      {filteredProjects?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-gray-500 text-lg">No projects found for the selected filter</div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Your First Project
          </button>
        </div>
      )}

      {/* Add Project Modal - Placeholder */}
      {/* {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Project</h2>
            <p className="text-gray-600 mb-6">
              This would be a comprehensive form to add a new project with all the necessary fields like title, description, images, etc.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/architect/add-project")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Portfolio;
