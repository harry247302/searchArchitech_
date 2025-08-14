"use client"
import React, { useEffect, useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import styled from 'styled-components';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { format } from 'date-fns';
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Pause,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import { mockArchitects } from '../data/demo';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { deleteMultipleArchitects, fetchArchitectsByPagination } from '@/app/redux/slices/architectSlice/ArchitectSlice';
import { approveArchitectStatus } from '@/app/redux/slices/adminslice/AdminAuthSlice';
const Main = () => {
    const [selectedArchitects, setSelectedArchitects] = useState([]);
    const dispatch = useDispatch()
    const [approve, setapprove] = useState({active_status:'',email:''})
    const [architects, setArchitects] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
  
  const [page, setPage] = useState(1)

 

  const handleCheckboxChange = (uuid) => {
    setSelectedArchitects((prevSelected) => {
      if (prevSelected.includes(uuid)) {
        return prevSelected.filter((id) => id !== uuid);
      } else {
        return [...prevSelected, uuid];
      }
    });

    
  };

  
  
  // To log updated state, use useEffect:
  useEffect(() => {
    console.log('Selected Architects:', selectedArchitects);
  }, [selectedArchitects]);
  

  const deleteHandler = async () => {
    try {

      const confirmed = window.confirm("Are you sure you want to delete the selected architects?");
      if (!confirmed) return;
      console.log(selectedArchitects);

      const result = await dispatch(deleteMultipleArchitects(selectedArchitects));
      console.log(result);

      if (result?.meta?.requestStatus === "fulfilled") {
        toast.success(result?.payload?.message);
           // ✅ Real-time update: remove deleted architects from UI
      setArchitects((prevData) =>
        prevData.filter(item => !selectedArchitects.includes(item.uuid))
      );


        setSelectedArchitects([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (architectId, newStatus) => {
    setArchitects(prev =>
      prev.map(architect =>
        architect.id === architectId
          ? { ...architect, status: newStatus }
          : architect
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <Check className="w-4 h-4" />;
      case 'blocked': return <X className="w-4 h-4" />;
      case 'suspended': return <Pause className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };
  const fetchData = async (page) => {
    try {
      // console.log("Fetching page:", page);
      
      const res = await dispatch(fetchArchitectsByPagination({ page, limit: 5 }));
      
      if (res?.payload?.success) {
        setArchitects(res?.payload?.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  useEffect(() => {
    fetchData(page)
  }, [page]);


 const approveArchitec = async (Status, Email) => {
  try {
    setapprove((prev) => ({ ...prev, active_status: Status, email: Email }));

    const response = await dispatch(approveArchitectStatus({ active_status: Status, email: Email }));
    if(response.meta.requestStatus === 'fulfilled'){
      fetchData(page)
      toast.success(response?.payload?.message)
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
  const ArchitectModal = ({ architect, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto transform animate-modal-slide-up shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Architect Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg">
                <span className="text-white text-xl font-bold">
                  {architect.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold">{architect.name}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(architect.status)}`}>
                  {getStatusIcon(architect.status)}
                  <span className="ml-1 capitalize">{architect.status}</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm break-all">{architect.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{architect.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{architect.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{architect.profile.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Joined:
                  {format(new Date(architect.joinDate), 'MM/dd/yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Profile Information</h5>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Experience:</span> {architect.profile.experience}</p>
                <p><span className="font-medium">Specialization:</span> {architect.profile.specialization}</p>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Documents</h5>
              <div className="space-y-2">
                {architect.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded transition-all duration-300 hover:shadow-md hover:border-blue-300 transform hover:scale-105">
                    <div>
                      <p className="text-sm font-medium">{doc.type}</p>
                      <p className="text-xs text-gray-500 break-all">{doc.fileName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {doc.verified ? 'Verified' : 'Pending'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-110" aria-label={`Download ${doc.fileName}`}>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end space-x-3 mt-6 pt-4 border-t gap-3">
          <button
            onClick={() => handleStatusChange(architect.id, 'approved')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>Approve</span>
          </button>
          <button
            onClick={() => handleStatusChange(architect.id, 'blocked')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <X className="w-4 h-4" />
            <span>Block</span>
          </button>
          <button
            onClick={() => handleStatusChange(architect.id, 'suspended')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Pause className="w-4 h-4" />
            <span>Suspend</span>
          </button>
        </div>
      </div>
    </div>
  );





  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 animate-slide-in-left">Architect Management</h2>
        {selectedArchitects?.length > 0 && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg self-start md:self-auto"
            onClick={deleteHandler}>
            Delete
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md mx-auto md:mx-0 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search architects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative max-w-xs mx-auto md:mx-0 w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="blocked">Blocked</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Architects Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] md:min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Architect
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {architects?.map((architect) => (
                <tr key={architect.id} className="hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 ">
                        <span className="">
                          {architect.first_name} {architect.last_name}
                        </span>
                      </div>

                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap min-w-[120px]">
                    <div className="text-sm text-gray-900 truncate">{architect.company_name}</div>
                    {/* <div className="text-sm text-gray-500 truncate">{architect.profile.location}</div> */}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium `}>
                      {/* <span className="ml-1 capitalize">{architect.active_status}</span> */}
                      <StyledWrapper>
                        <div className="cl-toggle-switch">
                          <label className="cl-switch">
                            <input
                              type="checkbox"
                              checked={architect.active_status === 'true'} // or simply: checked={architect.status}
                              onChange={(e) => {approveArchitec(e.target.checked, architect.email)
                              }}
                            />
                            <span />
                          </label>
                        </div>
                      </StyledWrapper>
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(architect.created_at), 'MM/dd/yyyy')}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>

                        {architect.phone_number}

                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">

                      <label key={architect.id} className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-600"
                          onChange={() => handleCheckboxChange(architect.uuid)}  // Pass full object
                        // checked={selectedArchitects.some((a) => a.id === id)}
                        />
                        {/* <span>{architect.name}</span> */}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
              {/* {filteredArchitects.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">No architects found.</td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>

      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {
              page == 1 ? <> </> : (
                <PaginationPrevious onClick={() => {
                  setPage((prev) => prev - 1)
                }} />
              )
            }
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => {
              fetchData(page)
              setPage((prev) => prev + 1)

            }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* 
      {showModal && selectedArchitect && (
        <ArchitectModal
          architect={selectedArchitect}
          onClose={() => {
            setShowModal(false);
            setSelectedArchitect(null);
          }}
        />
      )} */}
    </div>
  );
};

const StyledWrapper = styled.div`
  .cl-toggle-switch {
   position: relative;
  }

  .cl-switch {
   position: relative;
   display: inline-block;
  }
  /* Input */
  .cl-switch > input {
   appearance: none;
   -moz-appearance: none;
   -webkit-appearance: none;
   z-index: -1;
   position: absolute;
   right: 6px;
   top: -8px;
   display: block;
   margin: 0;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   background-color: rgb(0, 0, 0, 0.38);
   outline: none;
   opacity: 0;
   transform: scale(1);
   pointer-events: none;
   transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
  }
  /* Track */
  .cl-switch > span::before {
   content: "";
   float: right;
   display: inline-block;
   margin: 5px 0 5px 10px;
   border-radius: 7px;
   width: 36px;
   height: 14px;
   background-color: rgb(0, 0, 0, 0.38);
   vertical-align: top;
   transition: background-color 0.2s, opacity 0.2s;
  }
  /* Thumb */
  .cl-switch > span::after {
   content: "";
   position: absolute;
   top: 2px;
   right: 16px;
   border-radius: 50%;
   width: 20px;
   height: 20px;
   background-color: #fff;
   box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
   transition: background-color 0.2s, transform 0.2s;
  }
  /* Checked */
  .cl-switch > input:checked {
   right: -10px;
   background-color: #85b8b7;
  }

  .cl-switch > input:checked + span::before {
   background-color: #85b8b7;
  }

  .cl-switch > input:checked + span::after {
   background-color: #018786;
   transform: translateX(16px);
  }
  /* Hover, Focus */
  .cl-switch:hover > input {
   opacity: 0.04;
  }

  .cl-switch > input:focus {
   opacity: 0.12;
  }

  .cl-switch:hover > input:focus {
   opacity: 0.16;
  }
  /* Active */
  .cl-switch > input:active {
   opacity: 1;
   transform: scale(0);
   transition: transform 0s, opacity 0s;
  }

  .cl-switch > input:active + span::before {
   background-color: #8f8f8f;
  }

  .cl-switch > input:checked:active + span::before {
   background-color: #85b8b7;
  }
  /* Disabled */
  .cl-switch > input:disabled {
   opacity: 0;
  }

  .cl-switch > input:disabled + span::before {
   background-color: #ddd;
  }

  .cl-switch > input:checked:disabled + span::before {
   background-color: #bfdbda;
  }

  .cl-switch > input:checked:disabled + span::after {
   background-color: #61b5b4;
  }`;
export default Main;
