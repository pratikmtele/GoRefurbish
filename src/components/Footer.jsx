import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://readdy.ai/api/search-image?query=A%20minimalist%20modern%20logo%20for%20a%20secondhand%20marketplace%20featuring%20a%20stylized%20recycling%20symbol%20integrated%20with%20a%20shopping%20bag%20silhouette%2C%20using%20blue%20and%20green%20colors%20on%20a%20clean%20white%20background%2C%20professional%20and%20trustworthy%20appearance&width=120&height=40&seq=1&orientation=landscape"
              alt="GoRefurbish Logo"
              className="h-10 mb-4"
            />
            <p className="text-gray-600 text-sm">
              The trusted marketplace for refurbished items. Sell and buy with
              confidence while making a positive environmental impact.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Browse
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 GoRefurbish. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <div className="flex items-center">
                <i className="fab fa-cc-visa text-2xl text-gray-600 mr-2"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-600 mr-2"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-600 mr-2"></i>
                <i className="fab fa-cc-apple-pay text-2xl text-gray-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
