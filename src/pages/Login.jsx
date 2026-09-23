

import{ useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import { useLoginMutation } from "../service/api";

// ////////////////////////////////// //


const Login = () => {
  const [login] =useLoginMutation()

  const [formData,setFormData] =useState({
    email : "",
    password : "",
  })

  const handleLogin = async (e) => {
  e.preventDefault();
  try{
    console.log(formData.email)
    console.log(formData.password)
   const res = await login(formData).unwrap()
   console.log(res)
   console.log(res.data.role)
  } catch (error){
    console.log('this is error',error)
  }
  
};
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">L</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-indigo-600"
            />

            <span className="text-sm text-gray-600">
              Remember me
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          onClick={handleLogin}
          >
            Sign In
            
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
            <FaGoogle className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
            <FaGithub className="text-gray-900" />
            <span className="text-sm font-medium text-gray-700">
              GitHub
            </span>
          </button>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <button className="text-indigo-600 font-semibold hover:text-indigo-700">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
