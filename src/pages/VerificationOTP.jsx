
import { useState } from "react";
import { FiMail, FiShield } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import {
    useOtpVerificationApiMutation,
    useResentOtpApiMutation,
} from "../services/api";

const VerificationOTP = () => {

    // React Router hooks
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from previous page
    const useremail = location.state?.email || "";

    // Resend OTP API
    const [resentOtpApi] = useResentOtpApiMutation();

    // OTP verification API
    const [otpVerificationApi] = useOtpVerificationApiMutation();

    // Form data
    const [formData, setFormData] = useState({
        email: useremail,
        otp: "",
    });

    // Handle OTP verification
    const handleVerification = async () => {
        try {
            const res = await otpVerificationApi(formData).unwrap();

            console.log("OTP verification response:", res);

            // Navigate after successful verification
            navigate("/");

        } catch (err) {
            console.log("OTP verification error:", err);
        }
    };

    // Handle resend OTP
    const resentOtphandler = async () => {
        try {
            const response = await resentOtpApi({
                email: formData.email,
            }).unwrap();

            console.log("Resend OTP response:", response);

        } catch (error) {
            console.log("Resend OTP error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiShield className="text-blue-600 text-3xl" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Verify Your OTP
                    </h1>

                    <p className="text-gray-500 text-sm mt-2">
                        Enter the OTP sent to your email address
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

                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />

                        </div>

                    </div>

                    {/* OTP */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter OTP
                        </label>

                        <input
                            type="text"
                            value={formData.otp}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    otp: e.target.value,
                                }))
                            }
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none text-center tracking-[0.5em] text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        />

                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerification}
                        type="button"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                        Verify OTP
                    </button>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">

                    Didn't receive the OTP? Click{" "}

                    <button
                        onClick={resentOtphandler}
                        type="button"
                        className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                    >
                        Resend OTP
                    </button>

                </p>

            </div>

        </div>
    );
};

export default VerificationOTP;


