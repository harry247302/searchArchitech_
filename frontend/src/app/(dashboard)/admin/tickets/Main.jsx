"use client"
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Send
} from 'lucide-react';
import { mockTickets } from '../data/demo';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsForArchitect } from '@/app/redux/slices/ticketSlice/TicketSlice';
import { useRouter } from 'next/navigation';


const Main = () => {
  const [tickets, setTickets] = useState([]);
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.architech_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.created_at.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
            ...ticket,
            status: newStatus,
            resolvedDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : ticket.resolvedDate
          }
          : ticket
      )
    );
  };

  const handleAddComment = (ticketId, comment) => {
    if (!comment.trim()) return;

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
            ...ticket,
            comments: [
              ...ticket.comments,
              {
                id: Date.now().toString(),
                content: comment,
                author: 'Admin',
                timestamp: new Date().toLocaleString()
              }
            ]
          }
          : ticket
      )
    );
    setNewComment('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const TicketModal = ({ ticket, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto transform animate-modal-slide-up shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Ticket Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">{ticket.title}</h4>
              <p className="text-gray-600 mb-4">{ticket.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {getStatusIcon(ticket.status)}
                  <span className="ml-1 capitalize">{ticket.status}</span>
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()} PRIORITY
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Created by: {ticket.createdBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                </div>
                {ticket.assignedTo && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>
                )}
                {ticket.resolvedDate && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>Resolved: {new Date(ticket.resolvedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['open', 'in-progress', 'resolved', 'closed'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(ticket.id, status)}
                  className={`px-3 py-1 rounded text-white transition-all duration-300 transform hover:scale-105 ${status === 'open' ? 'bg-red-600 hover:bg-red-700' :
                    status === 'in-progress' ? 'bg-yellow-600 hover:bg-yellow-700' :
                      status === 'resolved' ? 'bg-green-600 hover:bg-green-700' :
                        'bg-gray-600 hover:bg-gray-700'
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-3">Comments & Resolution</h5>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {ticket.comments.map(comment => (
                  <div key={comment.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(ticket.id, newComment);
                    }
                  }}
                />
                <button
                  onClick={() => handleAddComment(ticket.id, newComment)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const state = useSelector(state => state?.ticket?.fetchTicket?.tickets)
  useEffect(() => {
    if (state) {
      setTickets(state);
    }
  }, [state]);
  // console.log(state, ":::::::::::::::::::::::::::::::");



  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 animate-slide-in-left">Ticket Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Export Tickets
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="relative">
              <select
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="w-[40%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map(ticket => (
                <tr key={ticket.uuid} className="hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
                  <td className="w-[10%] px-6 py-4">{ticket?.department}</td>
                  <td className="w-[10%] px-6 py-4 whitespace-nowrap">{ticket?.priority}</td>
                  <td className="w-[40%] px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.subject}</td>
                  <td className="">
                    <button
                      className={`
      px-12 py-1 rounded-full text-xs font-semibold 
      capitalize transition duration-200 ease-in-out 
      ${ticket?.status === 'open'
                          ? 'bg-red-100 text-red-700 hover:bg-green-200'
                          : ticket?.status === 'closed'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
    `}
                    >
                      {ticket?.status}
                    </button>
                  </td>
                  <td className="w-[20%] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(ticket?.created_at), 'MM/dd/yyyy')}
                  </td>
                  <td className="w-[10%] px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        router.push(`tickets/ticket-views/${ticket?.architect_details?.uuid}`)
                      }}
                      className="text-blue-600 hover:text-blue-900 transition-all duration-300 hover:scale-110 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {showModal && selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => {
            setShowModal(false);
            setSelectedTicket(null);
          }}
        />
      )}
    </div>
  );
};

export default Main;
