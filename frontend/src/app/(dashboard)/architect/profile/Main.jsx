"use client";
import React, { useState } from "react";
import { mockUser } from "../data/demo";
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Edit,
  Save,
  X,
  Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateArchitectsById } from "@/app/redux/slices/architectSlice/ArchitectSlice";

const Main = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: 'asdfsd',
    last_name: '',
    category: '',
    price: '',
    phone_number: '',
    street_address: '',
    apartment: '',
    state_name: '',
    city: '',
    postal_code: '',
    company_name: '',
    gst_no: '',
    profile_url: '',
    company_brochure_urlL: '',
    email: '',
    description: '',
    experience: 0,
    instagram_link: '',
    linkedin_link: '',
    facebook_link: '',
    other_link: '',
    experience: '',
    skills: []
  });
  const architect = useSelector((state) => state.architect?.architects);
  console.log(architect);

  const [skills, setSkills] = useState([""]);

  const dispatch = useDispatch()

  const handleSave = async () => {
    // console.log("Profile saved:", profile);
    try {
      const res = await dispatch(updateArchitectsById(profile)); // ✅ send full object
      console.log(res, "----------------------------");
    } catch (error) {
      console.log(error);
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
    setProfile({
      first_name: 'asdfsd',
      last_name: '',
      category: '',
      price: '',
      phone_number: '',
      street_address: '',
      apartment: '',
      state_name: '',
      city: '',
      postal_code: '',
      company_name: '',
      gst_no: '',
      profile_url: '',
      company_brochure_urlL: '',
      email: '',
      description: '',
      experience: 0,
      instagram_link: '',
      linkedin_link: '',
      facebook_link: '',
      other_link: '',
      experience: '',
      skills: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Profile Management
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-amber-950 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-900 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={architect?.profile_url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-4">
                  {isEditing ? (
                    <input
                      type="text"
                      // value={architect.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="text-2xl font-bold text-gray-900 text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">
                      {architect?.first_name} {architect?.last_name}
                    </h2>
                  )}
                  <div className="mt-2">

                    <div className="flex text-center justify-center items-center space-x-4">
                      <div className="text-center flex items-center">
                        <span className=" font-bold text-gray-700">
                          Architect •
                        </span>
                        {isEditing ? (
                          <input
                            type="number"
                            // value={profile?.experience}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                experience: parseInt(e.target.value),
                              })
                            }
                            className="ml-2 w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <span className="ml-2 text-gray-900">
                            {architect?.experience} Years of Experience
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      placeholder={architect.email}
                      type="email"
                      // value={architect.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-700">{architect?.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      placeholder={architect.phone}
                      // value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone_number: e.target.value })
                      }
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {architect?.phone_number}
                    </span>
                  )}
                </div>

                <div className="flex  item-center">

                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-3" />
                    {isEditing ? (
                      <input
                        placeholder={architect.apartment}
                        type="text"
                        // value={profile.apartment}
                        onChange={(e) =>
                          setProfile({ ...profile, apartment: e.target.value })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">
                        {architect?.apartment},

                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {/* <MapPin size={1           6} className="text-gray-500 mr-3" /> */}
                    {isEditing ? (
                      <input
                        placeholder={architect.location}
                        type="text"
                        // value={profile.location}
                        onChange={(e) =>
                          setProfile({ ...profile, city: e.target.value })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">

                        &nbsp;{architect?.city},&nbsp;

                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {/* <MapPin size={16} className="text-gray-500 mr-3" /> */}
                    {isEditing ? (
                      <input
                        type="text"
                        placeholder={architect?.state_name}
                        // value={profile.state_name}
                        onChange={(e) =>
                          setProfile({ ...profile, state_name: e.target.value })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">

                        {architect?.state_name} {" "}

                      </span>
                    )}
                  </div>   <div className="flex items-center">
                    {/* <MapPin size={16} className="text-gray-500 mr-3" /> */}
                    {isEditing ? (
                      <input
                        type="text"
                        placeholder={architect?.postal_code}
                        // value={profile.postal_code}
                        onChange={(e) =>
                          setProfile({ ...profile, postal_code: e.target.value })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">

                        {architect?.postal_code}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Social Links */}
              {/* <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Links</h3>
                <div className="space-y-3">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => {
                    const Icon = platform === 'instagram' ? Instagram :
                      platform === 'linkedin' ? Linkedin : Globe;
                    return (
                      <div key={platform} className="flex items-center">
                        <Icon size={16} className="text-gray-500 mr-3" />
                        {isEditing ? (
                          <input
                            type="url"
                            value={url || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socialLinks: { ...profile.socialLinks, [platform]: e.target.value }
                              })
                            }
                            placeholder={`${platform} URL`}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {url}
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div> */}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Social Links
                </h3>
                <div className="space-y-3">
  {[
    {
      field: "instagram_link",
      key: architect?.instagram_link,
      label: architect?.instagram_link,
      Icon: Instagram,
    },
    {
      field: "linkedin_link",
      key: architect?.linkedin_link,
      label: architect?.linkedin_link,
      Icon: Linkedin,
    },
    {
      field: "facebook_link",
      key: architect?.facebook_link,
      label: architect?.facebook_link,
      Icon: Globe,
    },
  ].map((ele, ind) => (
    <div key={ind} className="flex items-center">
      {isEditing ? (
        <input
          type="url"
          value={profile?.[ele.field] || ""}
          onChange={(e) =>
            setProfile({ ...profile, [ele.field]: e.target.value })
          }
          placeholder={`${ele.label} URL`}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      ) : ele.key ? (
        <a
          href={ele.key}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {ele.key}
        </a>
      ) : (
        <span className="text-gray-400 italic">
          No {ele.label} link
        </span>
      )}
    </div>
  ))}
</div>

              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2">
              <div className="space-y-6">

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Bio
                  </h3>
                  {isEditing ? (
                    <textarea
                      placeholder={architect?.description}
                      onChange={(e) =>
                        setProfile({ ...profile, description: e.target.value })
                      }
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{architect?.description}</p>
                  )}
                </div>

                {/* Skills */}


                {/* Experience */}


                {/* Privacy Settings */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Privacy Settings
                  </h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="publicProfile"
                      checked={profile.isPublic}
                      onChange={(e) =>
                        setProfile({ ...profile, isPublic: e.target.checked })
                      }
                      disabled={!isEditing}
                      className="mr-2"
                    />
                    <label htmlFor="publicProfile" className="text-gray-700">
                      Make profile public (visible to potential clients)
                    </label>
                  </div>
                </div> */}

                {/* Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {profile.averageRating}⭐
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Profile Views</p>
                      <p className="text-2xl font-bold text-gray-900">1,240</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
