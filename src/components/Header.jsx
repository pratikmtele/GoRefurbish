import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import useAuth from "../stores/useAuthStore";
import { toast } from "react-toastify";

const Header = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getMenuIcon = (path) => {
    switch (path) {
      case "/":
        return "fa-home";
      case "/browse":
        return "fa-search";
      case "/how-it-works":
        return "fa-question-circle";
      case "/about":
        return "fa-info-circle";
      case "/list-product":
        return "fa-plus-circle";
      default:
        return "fa-circle";
    }
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/about", label: "About Us" },
    { path: "/list-product", label: "Sell Item" },
  ];

  const authItems = [
    { path: "/signin", label: "Sign In" },
    { path: "/signup", label: "Sign Up" },
  ];
  return (
    <>
      <header className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img src={Logo} alt="GoRefurbish Logo" className="h-10" />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={
                      location.pathname === item.path
                        ? "text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-600"
                        : "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Desktop Auth Buttons */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center">
                <Link
                  to="/signin"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center relative">
                {/* Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-expanded={isProfileDropdownOpen}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    <i className="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-30"
                        onClick={closeProfileDropdown}
                      ></div>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={closeProfileDropdown}
                        >
                          <i className="fas fa-user mr-2"></i>
                          My Profile
                        </Link>

                        <Link
                          to="/my-listings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={closeProfileDropdown}
                        >
                          <i className="fas fa-list mr-2"></i>
                          My Listings
                        </Link>

                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={closeProfileDropdown}
                        >
                          <i className="fas fa-cog mr-2"></i>
                          Settings
                        </Link>

                        <div className="border-t border-gray-100 mt-1">
                          <button
                            onClick={() => {
                              // Add logout logic here
                              handleLogout();
                              closeProfileDropdown();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Log out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-gradient-to-b from-gray-900 to-black text-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center">
            <img src={Logo} alt="GoRefurbish Logo" className="h-8 w-auto" />
            <span className="ml-3 text-xl font-bold text-white">
              GoRefurbish
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* User Profile Section - Only show when authenticated */}
          {isAuthenticated && (
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {user?.fullName || "User"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <i
                    className={`fas ${getMenuIcon(
                      item.path
                    )} mr-3 w-5 text-center`}
                  ></i>
                  {item.label}
                </Link>
              ))}

              {/* Profile Menu Items - Mixed with main navigation when authenticated */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    onClick={closeSidebar}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <i className="fas fa-user-circle mr-3 w-5 text-center"></i>
                    My Profile
                  </Link>

                  <Link
                    to="/my-listings"
                    onClick={closeSidebar}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <i className="fas fa-box mr-3 w-5 text-center"></i>
                    My Listings
                  </Link>

                  <Link
                    to="/settings"
                    onClick={closeSidebar}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <i className="fas fa-cog mr-3 w-5 text-center"></i>
                    Settings
                  </Link>
                </>
              )}
            </div>

            {/* Auth Section - Only show when not authenticated */}
            {!isAuthenticated && (
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="space-y-3">
                  <Link
                    to="/signin"
                    onClick={closeSidebar}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 border border-gray-600"
                  >
                    <i className="fas fa-sign-in-alt mr-3"></i>
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeSidebar}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    <i className="fas fa-user-plus mr-3"></i>
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Logout Section - Only show when authenticated */}
          {isAuthenticated && (
            <div className="p-6 border-t border-gray-700/50">
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 border border-red-800/50"
              >
                <i className="fas fa-sign-out-alt mr-3"></i>
                Log out
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50">
            <p className="text-xs text-gray-500 text-center">
              © 2025 GoRefurbish. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
