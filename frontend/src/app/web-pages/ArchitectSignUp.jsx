"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import "@/styles/StyledWrapper.css";
import Link from "next/link";
import { architectSignUp, architectSignUpgf } from "../redux/slices/architectSlice/ArchitectAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import RouteChangeLoader from "@/components/RouteChangeLoader";
// import StyledWrapper from "@/components/StyledWrapper";

const ArchitectSignUp = () => {

  // loader

  const { loading, error } = useSelector((state) => state.architect);




  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [profile_url, setprofile_url] = useState(null);
  const [company_brochure_url, setcompany_brochure_url] = useState();
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch()
  const [signUpForm, SetsignUpForm] = useState({
    first_name: '',
    last_name: '',
    profile_url: profile_url,
    company_brochure_url: company_brochure_url,
    category: '',
    price: 0,
    phone_number: 0,
    email: '',
    password_hash: '',
    confirm_password: '',
    street_address: '',
    apartment: '',
    city: '',
    postal_code: 0,
    company_name: '',
    gst_no: '',
    state_name: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(signUpForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profile_url) {
        formData.append("profile_url", profile_url);
      }
      if (company_brochure_url) {
        formData.append("company_brochure_url", company_brochure_url);
      }
      if (signUpForm.confirm_password !== signUpForm.password_hash) {
        toast.error("Password do not password")
      } else {
        const result = await dispatch(architectSignUp(formData));
        console.log(result, "||||||||||||||||||||||||||||||||||||||||||||||||||");
        if (result?.payload?.message === "Registered successfully") {
          setShowModal(true)
          setTimeout(() => {
            // router.push('/')
            setShowModal(false)
          }, 3000)
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || "Sign-up failed");
      console.error(error);
    }
  };

  return (
    <>
      {loading && <RouteChangeLoader />}

      <div
        style={{ backgroundColor: "rgb(194 149 100 / 33%)" }}
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center w-[100%] h-[100vh] z-50"
      >
        <div className="bg-white flex items-center justify-center rounded-none lg:rounded-[40px] shadow-xl relative">
          {/* <StyledWrapper > */}
            <div className="container overflow-y-scroll max-h-[100vh] scrollbar-hide">
              <div className="heading">Sign Up as Architect</div>
              <form onSubmit={(e) => handleSubmit(e)}
                className="form">
                <div className="flex gap-4">
                  <label className="cursor-pointer w-32 h-32 border border-dashed border-[#be8e5a] flex items-center justify-center text-sm text-[#be8e5a] rounded-md hover:bg-[#be8e5a]/10 transition relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setprofile_url(file);
                        if (file) {
                          setPreview(URL.createObjectURL(file)); // ✅ preview image
                        }
                      }}
                      className="hidden"
                      required
                    />
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Upload"
                    )}
                  </label>

                  <input
                    className="input flex-1 h-13"
                    style={{ marginTop: "40px" }}
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }));
                    }}
                    placeholder="First Name *"
                    required
                  />
                  <input
                    className="input flex-1 h-13"
                    style={{ marginTop: "40px" }}
                    type="text"
                    name="lastName"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }));
                    }}
                    placeholder="Last Name *"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    placeholder="Email ID *"
                    required
                  />

                  <input
                    className="input"
                    type="password"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        password_hash: e.target.value,
                      }));
                    }}
                    name="password"
                    placeholder="Enter Password *"
                    required
                  />

                  <input
                    className="input"
                    type="password"
                    onChange={(e) => { SetsignUpForm((prev) => ({ ...prev, confirm_password: e.target.value })) }}
                    name="password"
                    placeholder="Confirm your Password *"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="input flex-1"
                    type="tel"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        phone_number: e.target.value,
                      }));
                    }}
                    name="phone"
                    placeholder="Phone No. *"
                    required
                  />

                  <input
                    className="input flex-1"
                    type="text"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }));
                    }}
                    name="Category"
                    placeholder="Category *"
                    required
                  />
                  <input
                    className="input flex-1"
                    type="number"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }));
                    }}
                    name="Price"
                    placeholder="Price *"
                    required
                  />
                </div>

                <div className="flex gap-4"></div>
                <input
                  className="input"
                  onChange={(e) => {
                    SetsignUpForm((prev) => ({
                      ...prev,
                      street_address: e.target.value,
                    }));
                  }}
                  type="text"
                  name="street address"
                  placeholder="Street address"
                />
                <input
                  className="input"
                  type="text"
                  required
                  onChange={(e) => { SetsignUpForm((prev) => ({ ...prev, apartment: e.target.value })) }}
                  name="Apartment"
                  placeholder="Apartment"
                />

                <div className="flex gap-4 flex-wrap">
                  <input
                    className="input flex-1 min-w-[120px]"
                    type="text"
                    name="city"
                    required
                    onChange={(e) => { SetsignUpForm((prev) => ({ ...prev, city: e.target.value })) }}
                    placeholder="City"
                  />
                  <input
                    className="input flex-1"
                    type="text"
                    required
                    name="state"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        state_name: e.target.value,
                      }));
                    }}
                    placeholder="State"
                  />
                  <input
                    className="input flex-1 min-w-[120px]"
                    type="text"
                    required
                    name="postal"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        postal_code: e.target.value,
                      }));
                    }}
                    placeholder="Postal Code"
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="input flex-1"
                    type="text"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        company_name: e.target.value,
                      }));
                    }}
                    name="company"
                    placeholder="Company Name *"
                    required
                  />
                  <input
                    className="input flex-1"
                    onChange={(e) => {
                      SetsignUpForm((prev) => ({
                        ...prev,
                        gst_no: e.target.value,
                      }));
                    }}
                    type="text"
                    name="gst"
                    required
                    placeholder="GST No."
                  />
                </div>

                <label className="block text-sm mt-2 mb-1 text-[#be8e5a]">
                  Upload Company Brochure
                </label>
                <input
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setcompany_brochure_url(file);
                  }}
                  // onChange={(e) => { setcompany_brochure_url((prev) => ({ ...prev, company_brochure_url: e.target.value[0] })) }} 
                  className="input" type="file" name="company_brochure_url" />
                {/* 
                  <button>
                  className="login-button w-[50px]"
                  type="submit"
                  value="SIGN UP"
                <button/> */}
                <button className="login-button w-[50px]" type="submit">
                  Sign Up
                </button>
                <span className="agreement">
                  <a href="/pages/architect-login">Already Login</a>
                </span>
              </form>

              <div className="flex justify-center mt-4">
                <a
                  href="/"
                  className="text-[#be8e5a] hover:underline  transition-colors duration-200"
                >
                  Back to Home
                </a>
              </div>
            </div>
          {/* </StyledWrapper> */}

          {/* Modal */}
          {showModal && (
            <div
              style={{ backgroundColor: "rgb(194 149 100 / 33%)" }}
              className="fixed   inset-0 bg-opacity-50 flex items-center justify-center w-[100%] h-[100vh] z-50"
            >
              <div className=" bg-white flex items-center justify-center  rounded-[40px] shadow-xl   relative">
                {/* <StyledWrapper> */}
                  <div className="container flex flex-col items-center justify-center p-6 text-center">
                    {/* ✅ Animated Tick Mark */}
                    <motion.div
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>

                    {/* ✅ Success Message */}
                    {/* {!isLoading && ( */}
                    <motion.h2
                      className="text-xl font-semibold text-green-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      You are under verification
                    </motion.h2>
                    {/* )} */}
                    <motion.p
                      className="text-gray-600 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Your submission was successful.
                    </motion.p>
                  </div>
                {/* </StyledWrapper> */}
              </div>
            </div>
          )}
          {/* // )} */}
        </div>
      </div>
    </>
  );
};

export default ArchitectSignUp;

// const StyledWrapper = styled.div`
//   .container {
//     // max-width: 450px;
//     width:100%;
//     background: #be8e5a;
//     background: linear-gradient(
//       0deg,
//       rgba(190, 142, 90, 0.16) 0%,
//       rgba(190, 142, 90, 0.08) 100%
//     );
//     border-radius: 40px;

//     padding: 25px 35px;
//     border: 5px solid rgb(255, 255, 255);
//     box-shadow: rgba(190, 142, 90, 0.47) 0px 30px 30px -20px;
//     // margin: 20px;
//   }

//   .heading {
//     text-align: center;
//     font-weight: 900;
//     font-size: 30px;
//     color: #be8e5a;
//   }

//   .form {
//     margin-top: 20px;
//   }

//   .form .input {
//     width: 100%;
//     background: white;
//     border: none;
//     padding: 15px 20px;
//     border-radius: 20px;
//     margin-top: 15px;
//     box-shadow: rgba(190, 142, 90, 0.41) 0px 10px 10px -5px;
//     border-inline: 2px solid transparent;
//   }

//   .form .input::-moz-placeholder {
//     color: rgb(170, 170, 170);
//   }

//   .form .input::placeholder {
//     color: #be8e5a;
//   }

//   .form .input:focus {
//     outline: none;
//     border-inline: 2px solid #be8e5a;
//   }

//   .form .forgot-password {
//     display: block;
//     margin-top: 10px;
//     margin-left: 10px;
//   }

//   .form .forgot-password a {
//     font-size: 11px;
//     color: #be8e5a;
//     text-decoration: none;
//   }

//   .form .login-button {
//     display: block;
//     width: 100%;
//     font-weight: bold;
//     background: linear-gradient(
//       45deg,
//       rgb(190, 142, 90) 0%,
//       rgba(190, 142, 90, 0.67) 100%
//     );
//     color: white;
//     padding-block: 15px;
//     margin: 20px auto;
//     border-radius: 20px;
//     box-shadow: rgba(190, 142, 90, 0.66) 0px 20px 10px -15px;
//     border: none;
//     transition: all 0.2s ease-in-out;
//   }

//   .form .login-button:hover {
//     transform: scale(1.03);
//     box-shadow: rgba(190, 142, 90, 0.7) 0px 23px 10px -20px;
//   }

//   .form .login-button:active {
//     transform: scale(0.95);
//     box-shadow: rgba(190, 142, 90, 0.66) 0px 15px 10px -10px;
//   }

//   .social-account-container {
//     margin-top: 25px;
//   }

//   .social-account-container .title {
//     display: block;
//     text-align: center;
//     font-size: 10px;
//     color: rgb(170, 170, 170);
//   }

//   .social-account-container .social-accounts {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     gap: 15px;
//     margin-top: 5px;
//   }

//   .social-account-container .social-accounts .social-button {
//     background: linear-gradient(
//       45deg,
//       rgb(0, 0, 0) 0%,
//       rgb(112, 112, 112) 100%
//     );
//     border: 5px solid white;
//     padding: 5px;
//     border-radius: 50%;
//     width: 40px;
//     aspect-ratio: 1;
//     display: grid;
//     place-content: center;
//     box-shadow: #be8e5a 0px 12px 10px -8px;
//     transition: all 0.2s ease-in-out;
//   }

//   .social-account-container .social-accounts .social-button .svg {
//     fill: white;
//     margin: auto;
//   }

//   .social-account-container .social-accounts .social-button:hover {
//     transform: scale(1.2);
//   }

//   .social-account-container .social-accounts .social-button:active {
//     transform: scale(0.9);
//   }

//   .agreement {
//     display: block;
//     text-align: center;
//     margin-top: 15px;
//   }

//   .agreement a {
//     text-decoration: none;
//     color: #be8e5a;
//     font-size: 14px;
//   }
//   .agreement a:hover {
//     text-decoration: underline;
//     cursor: pointer;
//   }
// `;
