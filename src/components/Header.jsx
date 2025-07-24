import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useAuth";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useLogout();

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
  );
};

export default Header;