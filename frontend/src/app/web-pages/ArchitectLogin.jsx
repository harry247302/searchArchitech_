"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { architectLogin, useArchitectLoginMutation } from "../redux/slices/architectSlice/ArchitectAuth";

import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getOtp } from "../redux/slices/getOtp/GetOtp";
import RouteChangeLoader from "@/components/RouteChangeLoader";


const ArchitectLogin = () => {
  const dispatch = useDispatch()
  // const [architechLogin, { data, error, isLoading }] = useArchitectLoginMutation();
  const router = useRouter()
  // const [getOtp, { isLoading: otpLoading, error: otpError, data: otpData }] = useGetOtpMutation();

  // loader
  const { loading, error } = useSelector((state) => state.architect);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [verifyOTP, setverifyOTP] = useState()
  const [otp, setotp] = useState()


  const handleOtp = async () => {
    if (!formData.email) {
      return toast.error('Email is required!');
    }

    if (!formData.password) {
      return toast.error('Password is required!');
    }

    const loadingToast = toast.loading('Sending OTP...');

    try {
      const result = await dispatch(getOtp(formData.email));
      console.log(result,"+++++++++++++++++++++++++++++++++");

      if (result?.payload?.message === 'OTP sent successfully!') {
        toast.success(result?.payload?.message);
        setotp(result?.payload?.hashedOtp)
      } else {
        toast.error('Failed to send OTP.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if OTP or verifyOTP is missing
      if (!otp || !verifyOTP) {
        toast.error("OTP is missing");
        return;
      }
  
      // Decode and compare OTP
      const decodedHash = decodeURIComponent(otp);
      const isMatch = await bcrypt.compare(verifyOTP, decodedHash);
  
      if (!isMatch) {
        toast.error("Invalid OTP");
        return;
      }
  
      // Proceed to login
      const result = await dispatch(architectLogin(formData));
       console.log(result);
  
      // Check login success
      if (result?.payload?.message === 'Login successful') {
        router.push('/architect');
      } else {
        toast.error(result?.payload?.message || "Login failed");
        console.log(result);
      }
  
    } catch (error) {
      console.log( error);
      toast.error(error?.payload?.message || "Something went wrong");
    }
  };

  return (
    <>
    {loading && <RouteChangeLoader/>}
      <div
        style={{ backgroundColor: "rgb(194 149 100 / 33%)" }}
        className="fixed   inset-0 bg-opacity-50 flex items-center justify-center w-[100%] h-[100vh] z-50"
      >
        <div className=" bg-white flex items-center justify-center  rounded-[40px] shadow-xl   relative">
          <StyledWrapper>
            <div className="container ">
              <div className="heading">Sign In as Architect</div>

              <form className="form">
                <input
                  required
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })) }}
                  placeholder="E-mail"
                />
                <input
                  required
                  className="input"
                  type="password"
                  name="password"
                  onChange={(e) => { setFormData((prev) => ({ ...prev, password: e.target.value })) }}
                  id="password"
                  placeholder="Password"
                />
                <div className="flex gap-4">
                  <input
                    required
                    className="input flex-1"
                    type="text"
                    name="otp"
                    onChange={(e) => { setverifyOTP(e.target.value) }}
                    id="otp"
                    placeholder="Enter OTP"
                    style={{ height: "60px" }}
                  />
                  <button type="button" onClick={() => { handleOtp() }} className="login-button flex-1">
                    Verify OTP
                  </button>
                </div>
                <span className="forgot-password">
                  <a href="#">Forgot Password ?</a>
                </span>
                <button
                  disabled={!otp}
                  onClick={handleSubmit}
                  className={`login-button flex items-center gap-2 ${!otp ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {!otp}
                  Submit
                </button>
              </form>
              <span className="agreement">
                <a href="/pages/architect-signup">Create your account</a>
              </span>

              <div className="flex justify-center mt-4">
                <a
                  href="/"
                  className="text-[#be8e5a] hover:underline  transition-colors duration-200"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </StyledWrapper>
        </div>
      </div>
    </>
  );
};

export default ArchitectLogin;

const StyledWrapper = styled.div`
  .container {
    // max-width: 450px;
    background: #be8e5a;
    background: linear-gradient(
      0deg,
      rgba(190, 142, 90, 0.16) 0%,
      rgba(190, 142, 90, 0.08) 100%
    );
    border-radius: 40px;

    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(190, 142, 90, 0.47) 0px 30px 30px -20px;
    // margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #be8e5a;
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: rgba(190, 142, 90, 0.41) 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: #be8e5a;
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #be8e5a;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: #be8e5a;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(190, 142, 90) 0%,
      rgba(190, 142, 90, 0.67) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(190, 142, 90, 0.66) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(190, 142, 90, 0.7) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(190, 142, 90, 0.66) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(
      45deg,
      rgb(0, 0, 0) 0%,
      rgb(112, 112, 112) 100%
    );
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: #be8e5a 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #be8e5a;
    font-size: 14px;
  }
  .agreement a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
