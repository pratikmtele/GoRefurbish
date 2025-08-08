import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authService } from "../api/services.js";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otpString = location.state?.otpString || "";

  useEffect(() => {
    console.log(email, otpString);
    if (!email || !otpString) {
      navigate("/forgot-password");
    }
  }, [email, otpString]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await authService.resetPassword(
        email,
        otpString,
        formData.newPassword
      );
      if (response.success) {
        toast.success(
          "Password reset successfully! You can now sign in with your new password."
        );
        localStorage.removeItem("otpEndTime");
        navigate("/signin");
      } else {
        setErrors({
          form:
            response.message || "Failed to reset password. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        form:
          error.message ||
          "An error occurred while resetting your password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={Logo} alt="ReUsed Logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-gray-600">
              Create a new password for your account
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <i className="fas fa-exclamation-circle text-red-400 mr-2 mt-0.5"></i>
                    <span className="text-red-700 text-sm">{errors.form}</span>
                  </div>
                </div>
              )}

              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                    touched={!!errors.newPassword}
                    placeholder="Enter your new password"
                    className="mb-0"
                    inputClassName="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer z-10"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400 hover:text-gray-600`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    touched={!!errors.confirmPassword}
                    placeholder="Confirm your new password"
                    className="mb-0"
                    inputClassName="pr-10"
                  />
                </div>

                {formData.confirmPassword && (
                  <div className="mt-2">
                    {formData.newPassword === formData.confirmPassword ? (
                      <p className="text-sm text-green-600 flex items-center">
                        <i className="fas fa-check mr-1"></i>
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 flex items-center">
                        <i className="fas fa-times mr-1"></i>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                icon={isSubmitting ? "fas fa-spinner" : undefined}
              >
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
