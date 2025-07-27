import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRegister } from "../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChevronDown,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const SignUp = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const { mutate: register } = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    gender: "MALE",
    role: "PET_OWNER",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "PET_OWNER" ? "VET" : "PET_OWNER",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailAddress ||
      !formData.password
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...registrationData } = formData;
    register(registrationData);
  };

  return (
    <div className=" bg-gradient-to-br h-[100vh]  from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-2xl my-14 h-[98vh]">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 py-5 px-8 ">
            <div className="flex justify-center">
              <Link to="/" className="inline-block">
                <h2 className="text-3xl font-bold text-white">PetCare</h2>
              </Link>
            </div>
            <h2 className="mt-2 text-center text-2xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="mt-1 text-center text-indigo-100 text-sm">
              Create your account in just a few steps
            </p>
          </div>

          <div className="px-6 md:px-8 md:py-3">
            {/* Error Message */}
            {error && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="your@email.com"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaEnvelope className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaLock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaLock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 appearance-none"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Register as
                  </label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          formData.role === "VET"
                            ? "text-teal-600"
                            : "text-gray-500"
                        }`}
                      >
                        Veterinarian
                      </span>
                      <div className="relative">
                        <button
                          type="button"
                          disabled
                          onClick={handleRoleToggle}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                            formData.role === "PET_OWNER"
                              ? "bg-teal-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                              formData.role === "PET_OWNER"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          formData.role === "PET_OWNER"
                            ? "text-teal-600"
                            : "text-gray-500"
                        }`}
                      >
                        Pet Owner
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r bg-gradient-to-br from-teal-600 to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <Link
                  to="/signin"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  Sign in to existing account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          <p>
            By creating an account, you agree to our{" "}
            <Link
              to="/terms"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
