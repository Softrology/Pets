import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Get authentication state from Redux store
  // Adjust these selectors based on your actual Redux state structure
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated || false
  );
  const userRole = useSelector((state) => state.auth?.user?.role || null);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUTS", href: "/about-us" },
    { name: "FIND DOCTOR", href: "/find-doctor" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact-us" },
    { name: "Login/Register AS VET", href: "/join-as-vet" },
  ];

  // Function to get dashboard URL based on user role
  const getDashboardUrl = () => {
    switch (userRole) {
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
    <nav className="bg-white shadow-sm position-sticky border-b py-3  border-gray-100">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-[#39a2a1] tracking-wider"
            >
              LOGO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-[#39a2a1] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              // Show Dashboard button for authenticated users
              <a
                href={getDashboardUrl()}
                className="bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
              >
                DASHBOARD
              </a>
            ) : (
              // Show Login/Signup buttons for non-authenticated users
              <div className="grid grid-cols-2 gap-3 w-full">
                <a
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-[#39a2a1] border border-[#39a2a1] hover:bg-[#39a2a1] hover:text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                >
                  LOGIN
                </a>
                <a
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                >
                  SIGN UP
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#39a2a1] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-[#39a2a1] hover:bg-gray-50 block px-3 py-2 text-base font-medium uppercase tracking-wide transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-2 space-y-3">
              {isAuthenticated ? (
                // Show Dashboard button for authenticated users (Mobile)
                <a
                  href={getDashboardUrl()}
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap w-full"
                >
                  DASHBOARD
                </a>
              ) : (
                // Show Login/Signup buttons for non-authenticated users (Mobile)
                <div className="grid grid-cols-2 gap-3 w-full">
                  <a
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-[#39a2a1] border border-[#39a2a1] hover:bg-[#39a2a1] hover:text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                  >
                    LOGIN
                  </a>
                  <a
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                  >
                    SIGN UP
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
