import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSendOTP, useVerifyOTP } from "../hooks/useAuth";
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaClock,
  FaRedo,
} from "react-icons/fa";

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
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (location.state?.emailAddress && location.state?.userId) {
      console.log("location.state?.emailAddress", location.state?.emailAddress);
      console.log("location.state?.userId", location.state?.userId);
      setEmailAddress(location.state.emailAddress);
      setUserId(location.state.userId);
      setMessage(location.state.message || "");
    } else {
      navigate("/signin", { state: { message: "Please login first" } });
    }
  }, [location.state, navigate]);

  // Separate useEffect to handle auto-sending OTP when emailAddress and userId are set
  useEffect(() => {
    if (emailAddress && userId && !otpSent) {
      console.log("Auto-sending OTP for:", emailAddress, userId);
      sendOTP(
        {
          emailAddress,
          userId,
        },
        {
          onSuccess: () => {
            setOtpSent(true);
            startTimer(); // Start the countdown timer
          },
        }
      );
    }
  }, [emailAddress, userId, otpSent, sendOTP]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, countdown]);

  const startTimer = () => {
    setCountdown(120); // 2 minutes = 120 seconds
    setIsTimerActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendOTP = () => {
    if (!emailAddress || !userId) {
      console.log("Missing emailAddress or userId:", { emailAddress, userId });
      return;
    }

    console.log("Sending OTP to:", emailAddress, "for user:", userId);
    sendOTP(
      {
        emailAddress,
        userId,
      },
      {
        onSuccess: () => {
          console.log("OTP sent successfully");
          setOtpSent(true);
          startTimer(); // Start the countdown timer
        },
        onError: (error) => {
          console.log("Error sending OTP:", error);
        },
      }
    );
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otpCode || !emailAddress) return;

    verifyOTP(
      {
        emailAddress,
        otpCode,
      },
      {
        onSuccess: () => {
          navigate("/signin", {
            state: {
              emailAddress,
              message: "Your account has been verified. Please login.",
            },
          });
        },
      }
    );
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setOtpCode(value);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-6 px-6">
            <div className="flex justify-center">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-bold text-white">PetCare</h2>
              </Link>
            </div>
            <h2 className="mt-2 text-center text-xl font-bold text-white">
              Verify Your Account
            </h2>
            <p className="mt-1 text-center text-teal-100 text-sm">
              We've sent a verification code to your email
            </p>
          </div>

          <div className="p-6">
            {/* Initial message from login */}
            {message && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-blue-700">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message for OTP Sent */}
            {otpSent && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-green-700">
                        OTP has been sent to {emailAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg p-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Email:{" "}
                  <span className="font-medium text-gray-900">
                    {emailAddress}
                  </span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label
                    htmlFor="otpCode"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Enter 4-digit verification code
                  </label>
                  <div className="relative">
                    <input
                      id="otpCode"
                      name="otpCode"
                      type="text"
                      required
                      className="block w-full px-4 py-3 text-center text-lg tracking-widest rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition duration-200"
                      placeholder="----"
                      value={otpCode}
                      onChange={handleOtpChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otpCode.length !== 4}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </button>

                {/* Timer and Resend Button */}
                <div className="text-center space-y-2">
                  {isTimerActive && countdown > 0 ? (
                    <div className="flex items-center justify-center space-x-2 text-teal-600">
                      <FaClock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Resend available in {formatTime(countdown)}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <FaRedo className="mr-2 h-3 w-3" />
                      {otpSent ? "Resend Code" : "Send Code"}
                    </button>
                  )}

                  {!isTimerActive && countdown === 0 && otpSent && (
                    <p className="text-xs text-gray-500 mt-1">
                      Didn't receive the code? Click resend above
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/signin"
                className="text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center transition duration-200"
              >
                <FaArrowLeft className="mr-1 h-3 w-3" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
