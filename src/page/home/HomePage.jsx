// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../../hooks/useAuth";

const HomePage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useLogout();
  console.log("homepage rendered");

  const handleLogout = () => {
    logout();
  };

  const getDashboardLink = () => {
    if (!user) return "/";

    switch (user.role) {
      case "PET_OWNER":
        return "/pet-owner/dashboard";
      case "VET":
        return "/vet/dashboard";
      case "SUPER_ADMIN":
        return "/super-admin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-indigo-600">PetCare</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Welcome, {user?.firstName} {user?.lastName}
                  </span>
                  <Link
                    to={getDashboardLink()}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Complete Pet Care Solutions
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your one-stop platform for all pet care needs. Connect with
            professional veterinarians, manage your pet's health, and access
            quality care services.
          </p>

          {!isAuthenticated && (
            <div className="flex justify-center space-x-6">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition duration-200"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Pet Health Management
              </h4>
              <p className="text-gray-600">
                Keep track of your pet's health records, vaccinations, and
                medical history in one place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Veterinarians
              </h4>
              <p className="text-gray-600">
                Connect with qualified veterinarians for consultations,
                treatments, and emergency care.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                24/7 Care Support
              </h4>
              <p className="text-gray-600">
                Access round-the-clock support and emergency services for your
                beloved pets.
              </p>
            </div>
          </div>
        </div>

        {/* Role-based Information */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Join Our Community
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Pet Owners
              </h4>
              <p className="text-gray-600 mb-4">
                Manage your pet's health, book appointments, and access care
                services.
              </p>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Register as Pet Owner
                </Link>
              )}
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Veterinarians
              </h4>
              <p className="text-gray-600 mb-4">
                Provide professional care, manage appointments, and help pet
                owners.
              </p>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Register as Veterinarian
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 PetCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
