'use client'
import { loginAdmin } from "@/app/redux/slices/adminslice/AdminAuthSlice";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
// import logo from '../../../../../public/company-logo.webp'



const AdminLogin = () => {

  const dispatch = useDispatch()
  const [Form, setForm] = useState({
    email: '',
    password_hash: ''
  })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sdgf");


    try {
      const result = await dispatch(loginAdmin(Form));
      console.log(result);

      if (loginAdmin.fulfilled.match(result)) {
        router.push('/admin');
      } else {
        // Login failed
        toast.error(result.payload?.message || "Login failed");
      }
    } catch (error) {

      toast.error(error?.message || "Unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />

      <div className="flex-grow flex w-full bg-white rounded-3xl shadow-lg flex-col md:flex-row">

        <div className=" flex justify-center items-center md:w-1/2 w-full h-screen md:h-auto">
          <div className="">
            <img
              src="/Logo/company-logo.webp"
              alt="login"
              className="w-[500px] h-auto object-cover"
            />
          </div>
        </div>

        <div className="flex md:w-1/2 w-full h-screen md:h-auto justify-center items-center">
          <StyledWrapper>
            <div className="container ">
              <div className="heading">Sign In</div>
              <form onSubmit={handleSubmit} className="form">
                <input onChange={(e) => {
                  setForm(prev => ({
                    ...prev,
                    email: e.target.value
                  }));
                }}
                  required className="input" type="email" name="email" id="email" placeholder="E-mail" />
                <input onChange={(e) => {
                  setForm(prev => ({
                    ...prev,
                    password_hash: e.target.value
                  }));
                }}
                  required className="input" type="password" name="password" id="password" placeholder="Password" />
                <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
                <input className="login-button" type="submit" defaultValue="Sign In" />
              </form>
              <div className="social-account-container">
                <span className="title">Or Sign in with</span>

              </div>
              <span className="agreement"><a href="#">Learn user licence agreement</a></span>
            </div>
          </StyledWrapper>
        </div>
      </div>

      <footer style={{ backgroundColor: '#be8e5a' }} className=" text-white text-center text-sm py-4 mt-auto">
        <div className="flex justify-center space-x-6 mb-2">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background: #be8e5a;
    background: linear-gradient(0deg,rgba(190, 142, 90, 0.16) 0%,rgba(190, 142, 90, 0.08) 100%);
    border-radius: 40px;
    
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow:rgba(190, 142, 90, 0.47) 0px 30px 30px -20px;
    margin: 20px;
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
    box-shadow:rgba(190, 142, 90, 0.41) 0px 10px 10px -5px;
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
    background: linear-gradient(45deg,rgb(190, 142, 90) 0%,rgba(190, 142, 90, 0.67) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow:rgba(190, 142, 90, 0.66) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow:rgba(190, 142, 90, 0.7) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow:rgba(190, 142, 90, 0.66) 0px 15px 10px -10px;
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
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
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
    font-size: 9px;
  }
`;

export default AdminLogin;
