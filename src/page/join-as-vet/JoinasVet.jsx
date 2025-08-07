import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Clock,
  Calendar,
  CheckCircle,
  ChevronDown,
  Star,
  Shield,
  Heart,
  Stethoscope,
  Clipboard,
  FileText,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useLogin } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import ApplicationForm from "./ApplicationForm";

const JoinasVet = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    emailAddress: "",
    password: "",
  });

  // Login hook
  const { mutate: login } = useLogin();
  const { isLoading, error } = useSelector((state) => state.auth);

  const benefits = [
    {
      icon: Shield,
      title: "Malpractice Insurance",
      description: "Comprehensive coverage to protect you and your practice",
    },
    {
      icon: Award,
      title: "Continuing Education",
      description: "Annual stipend for professional development courses",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Medical, dental, and vision insurance for you and family",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Choose shifts that work with your lifestyle",
    },
    {
      icon: Star,
      title: "Competitive Salary",
      description: "Base pay plus performance bonuses",
    },
    {
      icon: Stethoscope,
      title: "Modern Equipment",
      description: "State-of-the-art facilities and tools",
    },
  ];

  const requirements = [
    "DVM or equivalent degree from accredited institution",
    "Current state veterinary license in good standing",
    "Minimum 2 years clinical experience (new grads considered for residency)",
    "DEA license if prescribing controlled substances",
    "Strong communication and interpersonal skills",
    "Compassionate approach to patient care",
  ];

  const processSteps = [
    {
      step: 1,
      title: "Application Review",
      duration: "1-3 business days",
    },
    {
      step: 2,
      title: "Phone Screening",
      duration: "30 minute call",
    },
    {
      step: 3,
      title: "Clinical Interview",
      duration: "2-3 hour onsite visit",
    },
    {
      step: 4,
      title: "Reference Check",
      duration: "2-5 business days",
    },
    {
      step: 5,
      title: "Offer Extended",
      duration: "Within 1 week of final interview",
    },
  ];

  // Handle login input change
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.emailAddress || !loginData.password) {
      return;
    }
    login(loginData);
  };

  // Login Form Component
  const LoginForm = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back, Doctor!
        </h2>
        <p className="text-gray-600">
          Sign in to access your veterinary dashboard
        </p>
      </div>

      {/* Error Message */}
      {error && error.response?.data?.statusCode !== 403 && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || error.message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="loginEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              id="loginEmail"
              name="emailAddress"
              required
              value={loginData.emailAddress}
              onChange={handleLoginInputChange}
              className="pl-10 py-3 w-full rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="loginPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              name="password"
              required
              value={loginData.password}
              onChange={handleLoginInputChange}
              className="pl-10 pr-10 py-3 w-full rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Sign In to Dashboard
            </>
          )}
        </button>
      </form>

      {/* Toggle to Registration */}
      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account yet?
            </span>
          </div>
        </div>

        <button
          onClick={() => setAuthMode("register")}
          className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-teal-300 rounded-lg shadow-sm text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Apply as New Veterinarian
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Join Our <span className="text-teal-600">Veterinary Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {authMode === "login"
                ? "Welcome back! Sign in to access your veterinary dashboard and manage your practice."
                : "Grow your career with a team that values expertise, compassion, and innovation in animal care."}
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setAuthMode("login")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMode === "login"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                Existing Vet Login
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  authMode === "register"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Conditional Form Rendering */}
          {authMode === "login" ? <LoginForm /> : <ApplicationForm />}

          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab("benefits")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "benefits"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab("requirements")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "requirements"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Requirements
              </button>
              <button
                onClick={() => setActiveTab("process")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "process"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Hiring Process
              </button>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === "benefits" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-3 rounded-lg mr-4">
                          <benefit.icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <ul className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "process" && (
                <div className="space-y-8">
                  {processSteps.map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 mt-1 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {step.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Current Openings */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Current Openings
              </h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          Emergency Veterinarian
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          General Practice Vet
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Part-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          Veterinary Surgeon
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          Exotic Animal Specialist
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinasVet;
