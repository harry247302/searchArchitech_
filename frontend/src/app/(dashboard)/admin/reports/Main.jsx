"use client"
import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Ticket,
  Eye,
  BarChart3
} from 'lucide-react';
import styled from 'styled-components';

const Main = () => {
  const [selectedReport, setSelectedReport] = useState('architect-onboarding');
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    {
      id: 'architect-onboarding',
      name: 'Architect Onboarding Report',
      description: 'Monthly report of new architect registrations and approvals',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'ticket-resolution',
      name: 'Ticket Resolution Report',
      description: 'Analysis of ticket resolution times and performance',
      icon: Ticket,
      color: 'bg-green-500'
    },
    {
      id: 'visitor-engagement',
      name: 'Visitor Engagement Report',
      description: 'Detailed visitor analytics and engagement metrics',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      id: 'suspended-blocked',
      name: 'Suspended/Blocked Report',
      description: 'List of suspended and blocked architects with reasons',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      id: 'performance-analytics',
      name: 'Performance Analytics',
      description: 'Overall system performance and usage statistics',
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ];

  const ReportCard = ({ report, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${report.color}`}>
          <report.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{report.name}</h4>
          <p className="text-sm text-gray-500">{report.description}</p>
        </div>
      </div>
    </div>
  );

  const ReportPreview = () => {
    const generateMockData = () => {
      switch (selectedReport) {
        case 'architect-onboarding':
          return {
            title: 'Architect Onboarding Report',
            summary: {
              totalRegistrations: 45,
              approvedCount: 38,
              pendingCount: 4,
              rejectedCount: 3,
              avgApprovalTime: '2.3 days'
            },
            data: [
              { name: 'John Smith', email: 'john@example.com', status: 'Approved', date: '2024-01-15' },
              { name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Pending', date: '2024-01-20' },
              { name: 'Michael Chen', email: 'michael@example.com', status: 'Rejected', date: '2024-01-18' }
            ]
          };
        case 'ticket-resolution':
          return {
            title: 'Ticket Resolution Report',
            summary: {
              totalTickets: 89,
              resolvedCount: 66,
              avgResolutionTime: '3.2 hours',
              satisfactionRate: '94%'
            },
            data: [
              { id: 'T001', title: 'Upload Issue', status: 'Resolved', time: '2.5 hours' },
              { id: 'T002', title: 'Profile Verification', status: 'In Progress', time: '4.1 hours' },
              { id: 'T003', title: 'Account Access', status: 'Resolved', time: '1.8 hours' }
            ]
          };
        case 'visitor-engagement':
          return {
            title: 'Visitor Engagement Report',
            summary: {
              totalVisitors: 8420,
              uniqueVisitors: 6842,
              avgSessionTime: '4:32',
              bounceRate: '34%'
            },
            data: [
              { date: '2024-01-22', visitors: 245, sessions: 312, approaches: 567 },
              { date: '2024-01-21', visitors: 198, sessions: 267, approaches: 445 },
              { date: '2024-01-20', visitors: 234, sessions: 289, approaches: 523 }
            ]
          };
        default:
          return {
            title: 'Report Preview',
            summary: {},
            data: []
          };
      }
    };

    const reportData = generateMockData();

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{reportData.title}</h3>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(reportData.summary).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Trend Analysis</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div>
          <h4 className="font-medium mb-3">Detailed Data</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {reportData.data.length > 0 && Object.keys(reportData.data[0]).map(key => (
                    <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 text-sm text-gray-900 border">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-[85vw] h-[95vh] flex justify-center items-center'>
      <StyledWrapper>
        <div className="loader" />
        <p className='mt-10 text-gray-500'>Page is under construction</p>
      </StyledWrapper>
    </div>
    // <div className="space-y-6">
    //   <div className="flex items-center justify-between">
    //     <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
    //     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
    //       <Calendar className="w-4 h-4" />
    //       <span>Schedule Report</span>
    //     </button>
    //   </div>

    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     {/* Report Selection */}
    //     <div className="lg:col-span-1">
    //       <div className="bg-white rounded-lg shadow-md p-6">
    //         <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
    //         <div className="space-y-3">
    //           {reportTypes.map(report => (
    //             <ReportCard
    //               key={report.id}
    //               report={report}
    //               isSelected={selectedReport === report.id}
    //               onClick={() => setSelectedReport(report.id)}
    //             />
    //           ))}
    //         </div>
    //       </div>

    //       {/* Quick Actions */}
    //       <div className="bg-white rounded-lg shadow-md p-6 mt-6">
    //         <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
    //         <div className="space-y-3">
    //           <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
    //             <Download className="w-5 h-5 text-blue-500" />
    //             <span>Download All Reports</span>
    //           </button>
    //           <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
    //             <Calendar className="w-5 h-5 text-green-500" />
    //             <span>Schedule Weekly Email</span>
    //           </button>
    //           <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
    //             <Filter className="w-5 h-5 text-purple-500" />
    //             <span>Custom Report Builder</span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Report Preview */}
    //     <div className="lg:col-span-2">
    //       <ReportPreview />
    //     </div>
    //   </div>

    //   {/* Recent Downloads */}
    //   <div className="bg-white rounded-lg shadow-md p-6">
    //     <h3 className="text-lg font-semibold mb-4">Recent Downloads</h3>
    //     <div className="space-y-3">
    //       {[
    //         { name: 'Architect Onboarding Report - January 2024', date: '2024-01-22', size: '2.4 MB' },
    //         { name: 'Ticket Resolution Analytics - Q4 2023', date: '2024-01-15', size: '1.8 MB' },
    //         { name: 'Visitor Engagement Report - December 2023', date: '2024-01-08', size: '3.2 MB' }
    //       ].map((download, index) => (
    //         <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
    //           <div className="flex items-center space-x-3">
    //             <FileText className="w-5 h-5 text-blue-500" />
    //             <div>
    //               <p className="font-medium">{download.name}</p>
    //               <p className="text-sm text-gray-500">{download.date} • {download.size}</p>
    //             </div>
    //           </div>
    //           <button className="text-blue-600 hover:text-blue-800">
    //             <Download className="w-4 h-4" />
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};
const StyledWrapper = styled.div`
  .loader {
    width: 175px;
    height: 80px;
    display: block;
    margin: auto;
    background-image: radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), radial-gradient(circle 50px at 50px 50px, #FFF 100%, transparent 0), radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), linear-gradient(#FFF 50px, transparent 0);
    background-size: 50px 50px, 100px 76px, 50px 50px, 120px 40px;
    background-position: 0px 30px, 37px 0px, 122px 30px, 25px 40px;
    background-repeat: no-repeat;
    position: relative;
    box-sizing: border-box;
  }

  .loader::before {
    content: '';
    left: 60px;
    bottom: 18px;
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #FF3D00;
    background-image: radial-gradient(circle 8px at 18px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 18px 0px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 0px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 36px 18px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 18px 36px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 5px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 5px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 30px 30px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 5px 30px, #FFF 100%, transparent 0), radial-gradient(circle 4px at 5px 5px, #FFF 100%, transparent 0);
    background-repeat: no-repeat;
    box-sizing: border-box;
    animation: rotationBack 3s linear infinite;
  }

  .loader::after {
    content: '';
    left: 94px;
    bottom: 15px;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #FF3D00;
    background-image: radial-gradient(circle 5px at 12px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 12px 0px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 0px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 24px 12px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 12px 24px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 3px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 3px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 20px 20px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 3px 20px, #FFF 100%, transparent 0), radial-gradient(circle 2.5px at 3px 3px, #FFF 100%, transparent 0);
    background-repeat: no-repeat;
    box-sizing: border-box;
    animation: rotationBack 4s linear infinite reverse;
  }

  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }`;

export default Main;
