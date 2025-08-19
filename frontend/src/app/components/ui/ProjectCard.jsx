import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Edit, Trash2, MessageCircle } from 'lucide-react';
import { delete_projects_by_architect } from '@/app/redux/slices/projectSlice/ProjectSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const ProjectCard = ({
  project,
  onEdit,
  fetchData,
  onMessage,
  onDelete, // <-- notify parent to remove project
  showActions = true,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(project);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteProject = async (id) => {
    setLoading(true);
    try {
      const res = await dispatch(delete_projects_by_architect(id));
      console.log(res, ":::::::::::::::::::::::::::::::::::::::::::::::");

      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success(res?.payload?.message);
        if (onDelete) onDelete(id); // ⬅️ Real-time UI update
        fetchData()
      } else {
        toast.error(res?.payload?.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Something went wrong while deleting the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        {/* <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p> */}
        <div dangerouslySetInnerHTML={{ __html: project.description }}></div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2" />
            {project.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            {project.start_date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-2" />
            ₹{project.budget}
          </div>
        </div>

        {project.clientName && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Client: {project.clientName}</p>
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2">
            {/* {onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </button>
            )} */}

            {onMessage && project.status === 'ongoing' && (
              <button
                onClick={() => onMessage(project)}
                className="flex items-center px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <MessageCircle size={16} className="mr-1" />
                Message
              </button>
            )}

            <button
              onClick={() => handleDeleteProject(project?.project_uuid)}
              disabled={loading}
              className={`flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
              <Trash2 size={16} className="mr-1" />
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
