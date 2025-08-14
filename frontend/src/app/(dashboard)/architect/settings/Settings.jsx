"use client"
import React, { useState } from 'react';
import { Lock, Bell, Trash2, Shield, User, Mail } from 'lucide-react';
import styled from 'styled-components';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    indexProfile: true,
  });

  return (
    <div className='border w-[85vw] h-[95vh] flex justify-center items-center'>
      <StyledWrapper>
        <div className="loader" />
        <p className='mt-10 text-gray-500'>The page is under construction</p>
      </StyledWrapper>
    </div>




    //  <div className="space-y-6">
    //   {/* Header */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
    //     <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
    //   </div>

    //   {/* Account Settings */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="flex items-center mb-6">
    //       <User className="text-gray-500 mr-3" size={20} />
    //       <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
    //     </div>

    //     <div className="space-y-6">
    //       <div>
    //         <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               Current Password
    //             </label>
    //             <input
    //               type="password"
    //               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               New Password
    //             </label>
    //             <input
    //               type="password"
    //               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             />
    //           </div>
    //         </div>
    //         <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
    //           Update Password
    //         </button>
    //       </div>

    //       <div>
    //         <h3 className="text-lg font-medium text-gray-900 mb-4">Email Preferences</h3>
    //         <div className="space-y-3">
    //           <div className="flex items-center">
    //             <input type="checkbox" id="verifyEmail" className="mr-3" />
    //             <label htmlFor="verifyEmail" className="text-gray-700">
    //               Require email verification for new projects
    //             </label>
    //           </div>
    //           {/* <div className="flex items-center">
    //             <input type="checkbox" id="backup" className="mr-3" />
    //             <label htmlFor="backup" className="text-gray-700">
    //               Enable automatic data backup
    //             </label>
    //           </div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Notification Settings */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="flex items-center mb-6">
    //       <Bell className="text-gray-500 mr-3" size={20} />
    //       <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
    //     </div>

    //     <div className="space-y-4">
    //       {[
    //         { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
    //         { id: 'push', label: 'Push Notifications', desc: 'Get notified in your browser' },
    //         { id: 'sms', label: 'SMS Notifications', desc: 'Receive urgent updates via SMS' },
    //         { id: 'marketing', label: 'Marketing Emails', desc: 'Receive product updates and tips' },
    //       ].map(({ id, label, desc }) => (
    //         <div key={id} className="flex items-center justify-between">
    //           <div>
    //             <h3 className="font-medium text-gray-900">{label}</h3>
    //             <p className="text-sm text-gray-500">{desc}</p>
    //           </div>
    //           <label className="relative inline-flex items-center cursor-pointer">
    //             <input
    //               type="checkbox"
    //               checked={notifications[id]}
    //               onChange={(e) => setNotifications({ ...notifications, [id]: e.target.checked })}
    //               className="sr-only peer"
    //             />
    //             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Privacy Settings */}
    //   <div className="bg-white rounded-xl shadow-lg p-6">
    //     <div className="flex items-center mb-6">
    //       <Shield className="text-gray-500 mr-3" size={20} />
    //       <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
    //     </div>

    //     <div className="space-y-6">
    //       <div>
    //         <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
    //         <div className="space-y-3">
    //           {['public', 'private'].map((option) => (
    //             <div key={option} className="flex items-center">
    //               <input
    //                 type="radio"
    //                 id={option}
    //                 name="visibility"
    //                 value={option}
    //                 checked={privacy.profileVisibility === option}
    //                 onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
    //                 className="mr-3"
    //               />
    //               <label htmlFor={option} className="text-gray-700">
    //                 {option === 'public'
    //                   ? 'Public - Anyone can view your profile'
    //                   : 'Private - Only you can view your profile'}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div>
    //         <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
    //         <div className="space-y-3">
    //           {[
    //             { id: 'showEmail', label: 'Show email address on public profile' },
    //             { id: 'showPhone', label: 'Show phone number on public profile' },
    //             { id: 'indexProfile', label: 'Allow search engines to index my profile' },
    //           ].map(({ id, label }) => (
    //             <div key={id} className="flex items-center">
    //               <input
    //                 type="checkbox"
    //                 id={id}
    //                 checked={privacy[id]}
    //                 onChange={(e) => setPrivacy({ ...privacy, [id]: e.target.checked })}
    //                 className="mr-3"
    //               />
    //               <label htmlFor={id} className="text-gray-700">
    //                 {label}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Danger Zone */}
    //   <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
    //     <div className="flex items-center mb-6">
    //       <Trash2 className="text-red-500 mr-3" size={20} />
    //       <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
    //     </div>

    //     <div className="space-y-4">
    //       <div className="p-4 bg-red-50 rounded-lg">
    //         <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
    //         <p className="text-sm text-red-700 mb-4">
    //           Once you delete your account, there is no going back. Please be certain.
    //         </p>
    //         <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
    //           Delete Account
    //         </button>
    //       </div>

    //       <div className="p-4 bg-yellow-50 rounded-lg">
    //         <h3 className="font-medium text-yellow-900 mb-2">Export Data</h3>
    //         <p className="text-sm text-yellow-700 mb-4">
    //           Download a copy of your data including projects, messages, and profile information.
    //         </p>
    //         <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
    //           Export Data
    //         </button>
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

// export default Loader;

export default Settings;
