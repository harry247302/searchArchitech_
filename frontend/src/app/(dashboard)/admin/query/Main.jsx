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
import { useDeleteMultipleArchitectsMutation, useFetchAllArchitectsQuery, useFetchArchitectsByPagInationMutation } from '@/app/redux/slices/architectSlice/ArchitectSlice';
import toast from 'react-hot-toast';
import { useApproveStatusMutation } from '@/app/redux/slices/adminslice/AdminAuthSlice';
import { deleteContact, fetchForm } from '@/app/redux/slices/contactSlice/ContactSlice';
import { useDispatch } from 'react-redux';

const Main = () => {
  const [data, setdata] = useState()
  const [selectedQuery, setselectedQuery] = useState([])
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(10)
  const dispatch = useDispatch()
  const fetchData = async () => {
    try {
      console.log(page, "---------------------------");
      const res = await dispatch(fetchForm({ page }))

      if (res?.meta?.requestStatus === "fulfilled") {
        setdata(res.payload?.data)
      }

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {

    fetchData()
  }, [])
  const [architects, setArchitects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteHandler = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete the selected architects?");
      if (!confirmed) return;

      const result = await dispatch(deleteContact(selectedQuery));
      console.log(result);

      if (result?.meta?.requestStatus === "fulfilled") {
        toast.success(result?.payload?.message);

        // Remove deleted uuids from the data array
        setdata((prevData) =>
          prevData.filter(item => !selectedQuery.includes(item.uuid))
        );

        // Clear the selected items
        setselectedQuery([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (uuid) => {
    setselectedQuery((prevSelected) => {
      if (prevSelected.includes(uuid)) {
        return prevSelected.filter((id) => id !== uuid);
      } else {
        return [...prevSelected, uuid];
      }
    });
  };



  console.log(selectedQuery);



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
        <h2 className="text-2xl font-bold text-gray-900 animate-slide-in-left">All Queries</h2>
        {selectedQuery?.length > 0 && (
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
              placeholder="Search query..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* <div className="relative max-w-xs mx-auto md:mx-0 w-full md:w-auto">
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
          </div> */}
        </div>
      </div>

      {/* Architects Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] md:min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
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
              {
                data?.length > 0 ? (
                  data?.map((query) => (
                    <tr key={query.id} className="hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 ">
                            <span className="">
                              {query.first_name} {query.last_name}
                            </span>
                          </div>

                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap min-w-[120px]">
                        <div className="text-sm text-gray-900 truncate">{query.email}</div>
                        {/* <div className="text-sm text-gray-500 truncate">{architect.profile.location}</div> */}
                      </td>

                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {query.message.slice(0, 30)}...
                        {/* {format(new Date(query.created_at), 'MM/dd/yyyy')} */}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span>

                            {query.phone}

                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">

                          <label key={query.id} className="inline-flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-green-600"
                              onChange={() => handleCheckboxChange(query.uuid)}  // Pass full object
                            // checked={selectedQuery.some((a) => a.id === id)}
                            />
                            <span>{query.name}</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (

                  <tr className='text-center text-gray-400'>Data not found</tr>
                )
              }
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
            {page === 1 ? null : (
              <PaginationPrevious onClick={() => setpage((prev) => prev - 1)} />
            )}
          </PaginationItem>

          <PaginationItem>
            <PaginationLink >{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setpage((prev) => {
                  const nextPage = prev + 1;
                  fetchData(nextPage); // Call your data-fetch function with the next page
                  return nextPage;
                });
              }}
            />
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
