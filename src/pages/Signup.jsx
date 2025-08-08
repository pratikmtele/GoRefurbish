import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../components/index";
import { authService } from "../api/services";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    idNumber: "",
    termsAccepted: false,
  });
  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    // Step 2 validation
    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.idNumber.trim())
        newErrors.idNumber = "Aadhar card number is required";
      if (!formData.termsAccepted)
        newErrors.termsAccepted = "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        const response = await authService.signup(formData);
        console.log("Signup response:", response.success);
        if (response.success) {
          toast.success("Registration successful! Please sign in.");
          navigate("/signin");
        }
      } catch (error) {
        console.log("Signup error:", error);
        setSubmitError(
          error.message || "Registration failed. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Render progress bar
  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          <div
            className={`text-sm ${
              currentStep >= 1
                ? "text-primary-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            Basic Information
          </div>
          <div
            className={`text-sm ${
              currentStep >= 2
                ? "text-primary-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            KYC Details
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
            style={{ width: currentStep === 1 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>
    );
  };
  // Render step 1 form
  const renderStep1 = () => {
    return (
      <>
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.name}
          touched={!!errors.name}
          placeholder="Enter your full name"
          className="mb-6"
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          touched={!!errors.email}
          placeholder="Enter your email address"
          className="mb-6"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          touched={!!errors.password}
          placeholder="Create a password"
          className="mb-6"
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          touched={!!errors.confirmPassword}
          placeholder="Confirm your password"
          className="mb-6"
        />

        <div className="flex justify-end">
          <Button type="button" variant="primary" onClick={handleNextStep}>
            Next Step
          </Button>
        </div>
      </>
    );
  };
  // Render step 2 form
  const renderStep2 = () => {
    return (
      <>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Enter your full address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="idNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Aadhaar Card Number
          </label>
          <input
            type="number"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Enter your aadhaar card number"
          />
          {errors.idNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
          )}
        </div>
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={`h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 ${
                  errors.termsAccepted ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="termsAccepted"
                className="font-medium text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Submitting...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>
      </>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Join our community of buyers and sellers. Complete your
              registration to start listing your products.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            {renderProgressBar()}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
            </form>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
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
export default Signup;
