import { useState } from "react";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/services.js";
import { Button, Input } from "../components/index.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (errors.email) {
      setErrors({
        ...errors,
        email: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await authService.forgotPassword(email);

      if (response.success) {
        localStorage.removeItem("otpEndTime");
        setIsSubmitting(false);
        navigate("/otp", { state: { email } });
        return;
      }
    } catch (error) {
      setErrors({
        form:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setEmail("");
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={Logo} alt="ReUsed Logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              Forgot Password
            </h1>
            <p className="mt-2 text-gray-600">
              Enter your email address to reset your password
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

              <Input
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                error={errors.email}
                touched={!!errors.email}
                placeholder="Enter your email address"
                className="mb-5"
              />
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                icon={isSubmitting ? "fas fa-spinner" : undefined}
              >
                {isSubmitting ? "Sending OTP..." : "Submit"}
              </Button>
            </form>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/signin"
                data-readdy="true"
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

export default ForgotPassword;
