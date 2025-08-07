import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiHeart,
  FiCalendar,
  FiActivity,
  FiHome,
} from "react-icons/fi";

export default function RoleBasedHeader({
  onMenuClick,
  onToggleSidebar,
  sidebarCollapsed,
  userRole,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Parse user data from localStorage with null checking
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const userData = getUserData();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      // Clear all authentication data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.clear();

      setDropdownOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
      window.location.href = "/";
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const getInitials = () => {
    if (!userData || !userData.firstName || !userData.lastName) {
      return "NA";
    }
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

  const getDisplayValue = (value) => {
    return value && value !== null && value !== "" ? value : "N/A";
  };

  const getFullName = () => {
    if (!userData) return "N/A";
    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : "N/A";
  };

  const getFormattedRole = () => {
    if (!userData || !userData.role) return "N/A";
    return userData.role.replace("_", " ");
  };

  const getRoleColor = () => {
    switch (userRole) {
      case "PET_OWNER":
        return "from-[#10B981] to-[#059669]"; // Green gradient
      case "VET":
        return "from-[#3B82F6] to-[#1D4ED8]"; // Blue gradient
      case "SUPER_ADMIN":
        return "from-[#39a2a1] to-[#21527b]"; // Teal gradient
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "PET_OWNER":
        return <FiHeart className="h-4 w-4" />;
      case "VET":
        return <FiActivity className="h-4 w-4" />;
      case "SUPER_ADMIN":
        return <FiSettings className="h-4 w-4" />;
      default:
        return <FiUser className="h-4 w-4" />;
    }
  };

  const getWelcomeMessage = () => {
    const time = new Date().getHours();
    let greeting;
    if (time < 12) greeting = "Good morning";
    else if (time < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    const roleTitle =
      {
        PET_OWNER: "Pet Parent",
        VET: "Doctor",
        SUPER_ADMIN: "Admin",
      }[userRole] || "User";

    return `${greeting}, ${roleTitle}!`;
  };

  // Quick actions based on role
  const getQuickActions = () => {
    switch (userRole) {
      case "PET_OWNER":
        return [
          {
            icon: FiCalendar,
            label: "Book Appointment",
            action: () => navigate("/pet-owner/appointments"),
          },
          {
            icon: FiHeart,
            label: "My Pets",
            action: () => navigate("/pet-owner/my-pets"),
          },
        ];
      case "VET":
        return [
          {
            icon: FiCalendar,
            label: "Today's Schedule",
            action: () => navigate("/vet/schedule"),
          },
          {
            icon: FiUser,
            label: "Patient Records",
            action: () => navigate("/vet/patients"),
          },
        ];
      case "SUPER_ADMIN":
        return [
          {
            icon: FiUser,
            label: "User Management",
            action: () => navigate("/super-admin/users"),
          },
          {
            icon: FiActivity,
            label: "Vet Management",
            action: () => navigate("/super-admin/vets"),
          },
        ];
      default:
        return [];
    }
  };

  // If no user data, show fallback
  if (!userData) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-2"
                onClick={onMenuClick}
              >
                <FiMenu className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="hidden lg:block text-gray-500 hover:text-gray-700 mr-2"
                onClick={onToggleSidebar}
              >
                {sidebarCollapsed ? (
                  <FiChevronRight className="h-6 w-6" />
                ) : (
                  <FiChevronLeft className="h-6 w-6" />
                )}
              </button>

              <div className="flex-1 max-w-xs">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <FiBell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium">
                NA
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const quickActions = getQuickActions();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-2 transition-colors duration-200"
              onClick={onMenuClick}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              type="button"
              className="hidden lg:block text-gray-500 hover:text-gray-700 mr-2 transition-colors duration-200"
              onClick={onToggleSidebar}
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="h-6 w-6" />
              ) : (
                <FiChevronLeft className="h-6 w-6" />
              )}
            </button>

            {/* Home Button */}
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-[#39a2a1] hover:bg-gray-50 rounded-md transition-colors duration-200 border border-gray-200 hover:border-[#39a2a1]"
              title="Go to Homepage"
            >
              <FiHome className="h-4 w-4" />
              <span className="hidden sm:block text-sm font-medium">Home</span>
            </button>

            {/* Welcome Message */}
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-800">
                {getWelcomeMessage()}
              </h2>
              <p className="text-sm text-gray-500">
                Welcome to your {userRole?.replace("_", " ").toLowerCase()}{" "}
                dashboard
              </p>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${
                  userRole === "PET_OWNER"
                    ? "vets, appointments..."
                    : userRole === "VET"
                    ? "patients, appointments..."
                    : "users, vets..."
                }`}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  title={action.label}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="hidden xl:block">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <FiBell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <div
                  className={`h-8 w-8 rounded-full bg-gradient-to-r ${getRoleColor()} flex items-center justify-center text-white font-medium shadow-sm`}
                >
                  {getInitials()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {userData.firstName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    {getRoleIcon()}
                    <span className="ml-1">{getFormattedRole()}</span>
                  </p>
                </div>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-r ${getRoleColor()} flex items-center justify-center text-white font-medium shadow-sm`}
                      >
                        {getInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getFullName()}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {getDisplayValue(userData.emailAddress)}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${getRoleColor()} text-white`}
                        >
                          {getRoleIcon()}
                          <span className="ml-1">{getFormattedRole()}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Account Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <div className="flex space-x-1">
                          {userData.isActivated && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                          {userData.isEmailVerified && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                              Verified
                            </span>
                          )}
                          {!userData.isActivated &&
                            !userData.isEmailVerified && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                N/A
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Gender:</span>
                        <span className="text-gray-900">
                          {getDisplayValue(userData.gender)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone:</span>
                        <span className="text-gray-900">
                          {getDisplayValue(userData.phoneNumber)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">City:</span>
                        <span className="text-gray-900">
                          {getDisplayValue(userData.city)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Country:</span>
                        <span className="text-gray-900">
                          {getDisplayValue(userData.country)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Joined:</span>
                        <span className="text-gray-900">
                          {userData.createdAt
                            ? new Date(userData.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={handleHomeClick}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <FiHome className="h-4 w-4 mr-3" />
                      Go to Homepage
                    </button>
                    <button
                      onClick={() => {
                        const profilePath = {
                          PET_OWNER: "/pet-owner/profile",
                          VET: "/vet/profile",
                          SUPER_ADMIN: "/super-admin/settings",
                        }[userRole];
                        if (profilePath) navigate(profilePath);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <FiUser className="h-4 w-4 mr-3" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        const settingsPath = {
                          PET_OWNER: "/pet-owner/settings",
                          VET: "/vet/settings",
                          SUPER_ADMIN: "/super-admin/settings",
                        }[userRole];
                        if (settingsPath) navigate(settingsPath);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <FiSettings className="h-4 w-4 mr-3" />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                    >
                      <FiLogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
