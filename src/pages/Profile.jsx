import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../stores/useAuthStore";
import Input from "../components/Input";
import Button from "../components/Button";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aadhaarNumber: user?.aadhaarNumber || "",
    address: user?.address || "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber.replace(/\s/g, ""))) {
      newErrors.aadhaarNumber = "Aadhaar number must be 12 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // api call here

      // Update user data in store
      updateUser(formData);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        aadhaarNumber: user?.aadhaarNumber || "",
        address: user?.address || "",
      });
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(" ");
    }
    return value;
  };

  const formatAadhaarForDisplay = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 4) {
      const lastFour = cleaned.slice(-4);
      const maskedLength = Math.max(0, cleaned.length - 4);
      const masked = "X".repeat(maskedLength);

      const combined = masked + lastFour;
      const formatted = combined.match(/.{1,4}/g)?.join(" ") || "";
      return formatted;
    }
    return value;
  };

  const getAadhaarDisplayValue = () => {
    if (isEditing) {
      return formData.aadhaarNumber;
    }
    return formatAadhaarForDisplay(formData.aadhaarNumber);
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setFormData({
      ...formData,
      aadhaarNumber: formatted,
    });

    if (errors.aadhaarNumber) {
      setErrors({
        ...errors,
        aadhaarNumber: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <i className="fas fa-user text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>

            <Button
              onClick={handleEditToggle}
              variant={isEditing ? "secondary" : "primary"}
              icon={isEditing ? "fas fa-times" : "fas fa-edit"}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  touched={!!errors.fullName}
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                  className="mb-0"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                touched={!!errors.email}
                placeholder="Enter your email address"
                disabled={!isEditing}
                className="mb-0"
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                touched={!!errors.phone}
                placeholder="Enter your phone number"
                disabled={!isEditing}
                className="mb-0"
              />

              <div className="md:col-span-2">
                <Input
                  label="Aadhaar Card Number"
                  type="text"
                  name="aadhaarNumber"
                  value={getAadhaarDisplayValue()}
                  onChange={handleAadhaarChange}
                  error={errors.aadhaarNumber}
                  touched={!!errors.aadhaarNumber}
                  placeholder="Enter your 12-digit Aadhaar number"
                  disabled={!isEditing}
                  maxLength={14} // 12 digits + 2 spaces
                  className="mb-0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                      : "border-gray-300"
                  } ${
                    errors.address
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={isSubmitting ? "fas fa-spinner" : "fas fa-save"}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Profile Information
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Keep your profile information up to date to ensure smooth
                transactions and better communication with buyers and sellers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
