"use client"
import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, Mail, Phone, FileText } from 'lucide-react';
import styled from 'styled-components';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I add a new project to my portfolio?',
      answer: 'Navigate to the Portfolio section and click the "Add New Project" button. Fill in all the required details including title, description, images, and project type. Once submitted, your project will be visible in your portfolio.',
      category: 'Portfolio',
    },
    {
      id: '2',
      question: 'How do I respond to project requests?',
      answer: 'Go to the Project Requests section where you can view all incoming requests. Each request shows client details, project description, and budget. You can accept, reject, or message the client directly.',
      category: 'Projects',
    },
    {
      id: '3',
      question: 'Can I edit my profile information?',
      answer: 'Yes, you can edit your profile by going to the Profile section and clicking "Edit Profile". You can update your bio, contact information, skills, and social media links.',
      category: 'Profile',
    },
    {
      id: '4',
      question: 'How do I mark a project as completed?',
      answer: 'In the Ongoing Projects section, find the project you want to mark as complete and click the "Mark Complete" button. This will move the project to your completed projects list.',
      category: 'Projects',
    },
    {
      id: '5',
      question: 'How do I change my notification settings?',
      answer: 'Go to Settings and navigate to the Notification Preferences section. You can customize email, push, and SMS notifications according to your preferences.',
      category: 'Settings',
    },
    {
      id: '6',
      question: 'What should I do if I receive inappropriate messages?',
      answer: 'You can report inappropriate messages by clicking the report button in the message interface. We take all reports seriously and will investigate accordingly.',
      category: 'Safety',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', 'Portfolio', 'Projects', 'Profile', 'Settings', 'Safety'];

  return (
    <>
      <div className='border w-[85vw] h-[95vh] flex justify-center items-center'>
        <StyledWrapper>
          <div className="loader" />
          <p className='mt-10 text-gray-500'>The page is under construction</p>
        </StyledWrapper>
      </div>


    </>
    // <div className="space-y-6">
    //   {/* Header */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="flex items-center">
    //       <HelpCircle className="text-blue-600 mr-3" size={24} />
    //       <div>
    //         <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
    //         <p className="text-gray-600 mt-1">Find answers to common questions and get support</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Search */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="relative">
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    //       <input
    //         type="text"
    //         placeholder="Search for help articles..."
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>
    //   </div>

    //   {/* Quick Actions */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-50" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    //     {/* <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    //       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //         <MessageCircle className="text-blue-600" size={24} />
    //       </div>
    //       <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
    //       <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
    //       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
    //         Start Chat
    //       </button>
    //     </div> */}

    //     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    //       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //         <Mail className="text-green-600" size={24} />
    //       </div>
    //       <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
    //       <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
    //       <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
    //         Send Email
    //       </button>
    //     </div>

    //     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    //       <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //         <Phone className="text-purple-600" size={24} />
    //       </div>
    //       <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
    //       <p className="text-gray-600 text-sm mb-4">Call us during business hours</p>
    //       <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
    //         Call Now
    //       </button>
    //     </div>
    //   </div>

    //   {/* FAQ Section */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

    //     {/* Category Filter */}
    //     <div className="flex flex-wrap gap-2 mb-6">
    //       {categories.map((category) => (
    //         <button
    //           key={category}
    //           className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
    //         >
    //           {category}
    //         </button>
    //       ))}
    //     </div>

    //     {/* FAQ List */}
    //     <div className="space-y-4">
    //       {filteredFaqs.map((faq) => (
    //         <div key={faq.id} className="border border-gray-200 rounded-lg">
    //           <button
    //             onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
    //             className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
    //           >
    //             <div>
    //               <h3 className="font-medium text-gray-900">{faq.question}</h3>
    //               <span className="text-sm text-blue-600 mt-1">{faq.category}</span>
    //             </div>
    //             <div className={`transform transition-transform ${selectedFaq === faq.id ? 'rotate-180' : ''}`}>
    //               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    //               </svg>
    //             </div>
    //           </button>
    //           {selectedFaq === faq.id && (
    //             <div className="px-6 pb-4">
    //               <p className="text-gray-700">{faq.answer}</p>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Report Issues */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="flex items-center mb-4">
    //       <FileText className="text-red-500 mr-3" size={20} />
    //       <h2 className="text-xl font-bold text-gray-900">Report an Issue</h2>
    //     </div>
    //     <p className="text-gray-600 mb-4">
    //       If you're experiencing technical issues or want to report inappropriate behavior, please let us know.
    //     </p>
    //     <div className="flex space-x-4">
    //       <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
    //         Report Technical Issue
    //       </button>
    //       <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
    //         Report User Behavior
    //       </button>
    //     </div>
    //   </div>

    //   {/* Contact Information */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       <div>
    //         <h3 className="font-medium text-gray-900 mb-2">Support Hours</h3>
    //         <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
    //         <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM IST</p>
    //         <p className="text-gray-600">Sunday: Closed</p>
    //       </div>
    //       <div>
    //         <h3 className="font-medium text-gray-900 mb-2">Emergency Contact</h3>
    //         <p className="text-gray-600">For urgent issues outside business hours:</p>
    //         <p className="text-gray-600">Email: info.searcharchitect@gmail.com</p>
    //         <p className="text-gray-600">Phone: +91 9999 999 009</p>
    //       </div>
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
export default Support;
