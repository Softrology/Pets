import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiUsers,
  FiUser,
  FiSettings,
  FiCalendar,
  FiHeart,
  FiSearch,
  FiActivity,
  FiFileText,
  FiClock,
  FiUserCheck,
} from "react-icons/fi";

export default function RoleBasedSidebar({ onClose, collapsed, userRole }) {
  // Get navigation items based on user role
  const getNavItems = () => {
    switch (userRole) {
      case "PET_OWNER":
        return [
          { name: "Dashboard", icon: FiBarChart2, to: "dashboard" },
          { name: "My Pets", icon: FiHeart, to: "/pet-owner/my-pets" },
          { name: "Appointments", icon: FiCalendar, to: "appointments" },
          { name: "Find Vet", icon: FiSearch, to: "find-vet" },
          { name: "Profile", icon: FiUser, to: "profile" },
          { name: "Settings", icon: FiSettings, to: "settings" },
        ];
      case "VET":
        return [
          { name: "Dashboard", icon: FiBarChart2, to: "dashboard" },
          { name: "Appointments", icon: FiCalendar, to: "appointments" },
          { name: "Patient Records", icon: FiFileText, to: "patients" },
          { name: "Schedule", icon: FiClock, to: "schedule" },
          { name: "Profile", icon: FiUser, to: "profile" },
          { name: "Settings", icon: FiSettings, to: "settings" },
        ];
      case "SUPER_ADMIN":
        return [
          { name: "Dashboard", icon: FiBarChart2, to: "dashboard" },
          { name: "Vets", icon: FiUserCheck, to: "vets" },
          { name: "Users", icon: FiUsers, to: "users" },
          { name: "Settings", icon: FiSettings, to: "settings" },
        ];
      default:
        return [];
    }
  };

  // Get brand colors based on user role
  const getBrandColors = () => {
    switch (userRole) {
      case "PET_OWNER":
        return {
          gradient: "from-[#10B981] to-[#059669]", // Green gradient
          primary: "#10B981",
          secondary: "#059669",
          accent: "#064E3B",
          text: "Pet Owner",
        };
      case "VET":
        return {
          gradient: "from-[#3B82F6] to-[#1D4ED8]", // Blue gradient
          primary: "#3B82F6",
          secondary: "#1D4ED8",
          accent: "#1E3A8A",
          text: "Veterinarian",
        };
      case "SUPER_ADMIN":
        return {
          gradient: "from-[#39a2a1] to-[#21527b]", // Teal gradient
          primary: "#39a2a1",
          secondary: "#21527b",
          accent: "#2d8a89",
          text: "Super Admin",
        };
      default:
        return {
          gradient: "from-gray-400 to-gray-600",
          primary: "#6B7280",
          secondary: "#4B5563",
          accent: "#374151",
          text: "User",
        };
    }
  };

  // Get user data
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const navItems = getNavItems();
  const colors = getBrandColors();
  const userData = getUserData();

  const getInitials = () => {
    if (!userData || !userData.firstName || !userData.lastName) {
      return userRole === "PET_OWNER" ? "PO" : userRole === "VET" ? "VT" : "SA";
    }
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
  };

  const getFullName = () => {
    if (!userData) return colors.text;
    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : colors.text;
  };

  const getEmail = () => {
    if (!userData || !userData.emailAddress) {
      const defaultEmails = {
        PET_OWNER: "petowner@petcare.com",
        VET: "vet@petcare.com",
        SUPER_ADMIN: "admin@petcare.com",
      };
      return defaultEmails[userRole] || "user@petcare.com";
    }
    return userData.emailAddress;
  };

  const getRoutePrefix = () => {
    switch (userRole) {
      case "PET_OWNER":
        return "/pet-owner";
      case "VET":
        return "/vet";
      case "SUPER_ADMIN":
        return "/super-admin";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-gradient-to-b ${colors.gradient} ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out shadow-lg`}
    >
      {/* Attractive Header */}
      <div
        className={`flex items-center justify-between p-4 border-b border-opacity-30 ${
          collapsed ? "flex-col space-y-2" : ""
        }`}
        style={{ borderColor: colors.accent }}
      >
        {!collapsed ? (
          <>
            <div className="flex items-center">
              <div 
                className="h-8 w-8 rounded-md flex items-center justify-center text-white font-bold mr-3 shadow-sm"
                style={{ backgroundColor: colors.primary }}
              >
                PC
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PetCare</h1>
                <p className="text-xs text-white text-opacity-80">{colors.text}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div 
              className="h-8 w-8 rounded-md flex items-center justify-center text-white font-bold shadow-sm"
              style={{ backgroundColor: colors.primary }}
            >
              PC
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={`${getRoutePrefix()}/${item.to}`}
            end
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-md transition-all
              ${
                isActive
                  ? "text-white shadow-md"
                  : "text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10"
              }
              ${collapsed ? "justify-center" : ""}
              duration-200
            `}
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.accent : 'transparent',
            })}
            title={collapsed ? item.name : ""}
          >
            <item.icon className={`h-5 w-5 ${!collapsed ? "mr-3" : ""}`} />
            {!collapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div
        className={`p-4 border-t border-opacity-30 ${
          collapsed ? "flex justify-center" : ""
        }`}
        style={{ borderColor: colors.accent }}
      >
        <div
          className={`flex items-center ${
            collapsed ? "flex-col space-y-2" : ""
          }`}
        >
          <div 
            className="h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-sm font-medium"
            style={{ 
              background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})` 
            }}
          >
            {getInitials()}
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {getFullName()}
              </p>
              <p className="text-xs font-medium text-white text-opacity-80 truncate">
                {getEmail()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Role-specific footer info */}
      {!collapsed && (
        <div className="px-4 py-2 text-center border-t border-opacity-30" style={{ borderColor: colors.accent }}>
          <div className="text-xs text-white text-opacity-60">
            {userRole === "PET_OWNER" && "Caring for your beloved pets"}
            {userRole === "VET" && "Providing quality veterinary care"}
            {userRole === "SUPER_ADMIN" && "Managing the PetCare system"}
          </div>
        </div>
      )}
    </div>
  );
}