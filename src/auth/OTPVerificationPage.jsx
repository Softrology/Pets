import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSendOTP, useVerifyOTP } from "../hooks/useAuth";

const OTPVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { mutate: sendOTP } = useSendOTP();
  const { mutate: verifyOTP } = useVerifyOTP();

  const [otpCode, setOtpCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    // Get email and userId from location state or redirect to login
    if (location.state?.emailAddress && location.state?.userId) {
      setEmailAddress(location.state.emailAddress);
      setUserId(location.state.userId);
    } else {
      navigate("/login");
    }
  }, [location.state, navigate]);

  const handleSendOTP = () => {
    if (!emailAddress || !userId) return;

    sendOTP({
      emailAddress,
      userId,
    });
    setOtpSent(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otpCode || !emailAddress) return;

    verifyOTP({
      emailAddress,
      otpCode,
    });
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setOtpCode(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <h2 className="text-3xl font-bold text-indigo-600">PetCare</h2>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We need to verify your email address to complete your registration
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message for OTP Sent */}
        {otpSent && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  OTP has been sent to your email address!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Email:{" "}
              <span className="font-medium text-gray-900">{emailAddress}</span>
            </p>
          </div>

          {!otpSent ? (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Click the button below to send a verification code to your email
              </p>
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label
                  htmlFor="otpCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter 6-digit verification code
                </label>
                <input
                  id="otpCode"
                  name="otpCode"
                  type="text"
                  maxLength="6"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest"
                  placeholder="000000"
                  value={otpCode}
                  onChange={handleOtpChange}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                >
                  Resend verification code
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
