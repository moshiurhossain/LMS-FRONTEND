
import { FiMail, FiLock, FiKey } from "react-icons/fi";
import { useResetPasswordApiMutation } from "../services/api";
import { useState } from "react";

const ResetPassword = () => {
    // get reset password api
    const [resetPasswordApi] = useResetPasswordApiMutation();

    // React state for form data
    const [formData, setFormData] = useState({
        email: "",
        forgetPasswordOtp: "",
        password: ""
    });

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPasswordApi(formData).unwrap();
            console.log("Reset password response:", response);
        }catch (error) {
            console.error("Error resetting password:", error);
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiLock className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email, OTP and new password
          </p>
        </div>

        {/* Form */}
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
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Forget Password OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forget Password OTP
            </label>

            <div className="relative">
              <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Enter your OTP"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={formData.forgetPasswordOtp}
                onChange={(e) => setFormData({...formData, forgetPasswordOtp: e.target.value})}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

        </div>

      </div>
    </div>
  );
};

export default ResetPassword;

