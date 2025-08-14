"use client";
import { fetchTicketsOfArchitect } from "@/app/redux/slices/ticketSlice/TicketSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const allTickets = [
  {
    id: "#425111",
    department: "Technical Support",
    subject: "Request for Server Reset – uni.admissionportals.in",
    status: "Closed",
    updated: "Thursday, May 29th, 2025 (13:12)",
  },
  {
    id: "#679585",
    department: "General Enquiries",
    subject: "Issue with Source Code Location",
    status: "Closed",
    updated: "Thursday, April 17th, 2025 (17:48)",
  },
  {
    id: "#504629",
    department: "General Enquiries",
    subject: "Request for Root Password – Server 166.0.242.14",
    status: "Closed",
    updated: "Wednesday, April 16th, 2025 (18:22)",
  },
  {
    id: "#371174",
    department: "General Enquiries",
    subject: "Request for Root Password – Server 166.0.242.14",
    status: "Closed",
    updated: "Tuesday, April 1st, 2025 (15:10)",
  },
  {
    id: "#003401",
    department: "General Enquiries",
    subject: "Request for Technical Support and Assistance with Code Deployment",
    status: "Closed",
    updated: "Monday, March 24th, 2025 (15:32)",
  },
  {
    id: "#986432",
    department: "General Enquiries",
    subject: "Request for Technical Support and Assistance with Code Deployment",
    status: "Closed",
    updated: "Monday, March 24th, 2025 (13:45)",
  },
  {
    id: "#007777",
    department: "Technical Support",
    subject: "Request for VPS Root Password Retrieval",
    status: "Closed",
    updated: "Sunday, March 23rd, 2025 (21:59)",
  },
  {
    id: "#955731",
    department: "General Enquiries",
    subject: "Activation of server",
    status: "Closed",
    updated: "Sunday, March 23rd, 2025 (15:51)",
  },
  {
    id: "#584072",
    department: "Technical Support",
    subject: "Change password",
    status: "Closed",
    updated: "Monday, March 10th, 2025 (20:52)",
  },
  {
    id: "#202775",
    department: "General Enquiries",
    subject: "Request for New Access Key",
    status: "Closed",
    updated: "Monday, March 10th, 2025 (15:51)",
  },
];

const ITEMS_PER_PAGE = 5;

export default function ViewTickets() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [allTicket, setAllTicket] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchTicketsOfArchitect())
      console.log(res, "------------------------------------------");
      if (res?.meta?.requestStatus === "fulfilled") { setAllTicket(res?.payload) }
    }
    fetchData()
  }, [])

  const totalPages = Math.ceil(allTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const currentTickets = allTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  console.log(allTicket);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Showing 1 to
          {/* {currentTickets.length} of {allTickets.length} */}
          entries</h2>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-3 text-sm font-medium border">Department</th>
            <th className="px-4 py-3 text-sm font-medium border">Subject</th>
            <th className="px-4 py-3 text-sm font-medium border">Status</th>
            <th className="px-4 py-3 text-sm font-medium border">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {allTicket?.tickets?.map((ticket, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="px-4 py-3 border">{ticket.department}</td>
              <td className="px-4 py-3 border">
                <p className="text-blue-500 font-semibold">#{ticket.ticket_id}</p>
                <p className="text-sm text-gray-700">{ticket.subject}</p>
              </td>
              <td className="px-4 py-3 border">
                <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-3 border">
                {new Date(ticket.created_at).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-2 md:space-y-0">
        <span className="text-sm text-gray-600">
          Showing
          {/* {startIndex + 1} to {startIndex + currentTickets.length} of {allTickets.length} */}
          entries
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
