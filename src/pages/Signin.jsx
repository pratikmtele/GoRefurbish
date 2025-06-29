import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
const Signin = () => {
  // Login form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Login successful!");
        // Redirect or update state
      }, 1500);
    }
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img
              src="https://readdy.ai/api/search-image?query=A%2520minimalist%2520modern%2520logo%2520for%2520a%2520secondhand%2520marketplace%2520featuring%2520a%2520stylized%2520recycling%2520symbol%2520integrated%2520with%2520a%2520shopping%2520bag%2520silhouette%252C%2520using%2520blue%2520and%2520green%2520colors%2520on%2520a%2520clean%2520white%2520background%252C%2520professional%2520and%2520trustworthy%2520appearance&width=120&height=40&seq=1&orientation=landscape"
              alt="ReUsed Logo"
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            {/* Social Login Options */}
            {/* <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fab fa-google text-red-500 mr-3"></i>
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fab fa-facebook text-blue-600 mr-3"></i>
                Continue with Facebook
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fab fa-apple text-gray-900 mr-3"></i>
                Continue with Apple
              </button>
            </div> */}
            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div> */}
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <Input
                label="Email or Username"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                touched={!!errors.email}
                placeholder="Enter your email or username"
                className="mb-5"
              />
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    touched={!!errors.password}
                    placeholder="Enter your password"
                    className="mb-0"
                    inputClassName="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                icon={isSubmitting ? "fas fa-spinner" : undefined}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                data-readdy="true"
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Signin;
