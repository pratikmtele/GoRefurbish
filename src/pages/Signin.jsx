import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../assets/logo.jpg";
import { authService } from "../api/services.js";
import useAuth from "../stores/useAuthStore.jsx";

const Signin = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await authService.signin({
        email: formData.email,
        password: formData.password,
      });

      login(response.data.user);

      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });

      setErrors({});
      setShowPassword(false);

      navigate("/");
    } catch (error) {
      setErrors({
        form: "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={Logo} alt="ReUsed Logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Displaying form-level error */}
              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <i className="fas fa-exclamation-circle text-red-400 mr-2 mt-0.5"></i>
                    <span className="text-red-700 text-sm">{errors.form}</span>
                  </div>
                </div>
              )}

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
