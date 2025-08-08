import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../components/index.js";

const ProductListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    negotiable: false,
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchCategory, setSearchCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Gaming",
        "Audio",
        "Cameras",
      ],
    },
    {
      id: 2,
      name: "Furniture",
      subcategories: ["Living Room", "Bedroom", "Office", "Outdoor", "Storage"],
    },
    {
      id: 3,
      name: "Fashion",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
        "Bags",
      ],
    },
    {
      id: 4,
      name: "Books",
      subcategories: [
        "Fiction",
        "Non-Fiction",
        "Textbooks",
        "Children's Books",
        "Comics",
      ],
    },
    {
      id: 5,
      name: "Home & Garden",
      subcategories: ["Kitchen", "Bathroom", "Decor", "Tools", "Plants"],
    },
    {
      id: 6,
      name: "Sports",
      subcategories: [
        "Fitness",
        "Outdoor Sports",
        "Team Sports",
        "Water Sports",
        "Winter Sports",
      ],
    },
    {
      id: 7,
      name: "Toys & Games",
      subcategories: [
        "Board Games",
        "Video Games",
        "Educational Toys",
        "Action Figures",
        "Puzzles",
      ],
    },
    {
      id: 8,
      name: "Automotive",
      subcategories: [
        "Car Parts",
        "Motorcycles",
        "Accessories",
        "Tools",
        "Maintenance",
      ],
    },
    {
      id: 9,
      name: "Musical Instruments",
      subcategories: [
        "Guitars",
        "Keyboards",
        "Drums",
        "Wind Instruments",
        "Audio Equipment",
      ],
    },
    {
      id: 10,
      name: "Art & Collectibles",
      subcategories: [
        "Paintings",
        "Sculptures",
        "Antiques",
        "Trading Cards",
        "Vintage Items",
      ],
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchCategory.toLowerCase()) ||
      category.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchCategory.toLowerCase())
      )
  );

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Product title is required";
        if (value.length < 5) return "Title must be at least 5 characters";
        if (value.length > 100) return "Title must not exceed 100 characters";
        return "";

      case "description":
        if (!value.trim()) return "Product description is required";
        if (value.length < 20)
          return "Description must be at least 20 characters";
        if (value.length > 1000)
          return "Description must not exceed 1000 characters";
        return "";

      case "category":
        if (!value) return "Please select a category";
        return "";

      case "condition":
        if (!value) return "Please select product condition";
        return "";

      case "price":
        if (!value) return "Price is required";
        if (isNaN(value) || parseFloat(value) <= 0)
          return "Please enter a valid price";
        if (parseFloat(value) > 10000000)
          return "Price cannot exceed ₹1,00,00,000";
        return "";

      case "images":
        if (!value || value.length === 0)
          return "At least one image is required";
        if (value.length > 5) return "Maximum 5 images allowed";

        // Check file types and sizes
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        for (let file of value) {
          if (!allowedTypes.includes(file.type)) {
            return "Only PNG, JPG, JPEG, and WebP files are allowed";
          }
          if (file.size > maxFileSize) {
            return "Each image must be less than 5MB";
          }
        }
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      if (field === "negotiable") return; // Skip boolean field
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field and update errors
    if (type !== "checkbox") {
      const error = validateField(name, fieldValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleCategorySelect = (categoryName) => {
    setFormData((prev) => ({ ...prev, category: categoryName }));
    setSearchCategory(categoryName);
    setShowDropdown(false);

    // Mark as touched and validate
    setTouched((prev) => ({ ...prev, category: true }));
    const error = validateField("category", categoryName);
    setErrors((prev) => ({ ...prev, category: error }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: `Invalid file type. Only PNG, JPG, JPEG, and WebP files are allowed.`,
      }));
      return;
    }

    // Validate file size
    const oversizedFiles = files.filter((file) => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: `Some files are too large. Maximum size is 5MB per file.`,
      }));
      return;
    }

    // Validate file count
    if (formData.images.length + files.length > maxImages) {
      setErrors((prev) => ({
        ...prev,
        images: `You can only upload a maximum of ${maxImages} images`,
      }));
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    // Mark as touched and validate
    setTouched((prev) => ({ ...prev, images: true }));
    const error = validateField("images", newImages);
    setErrors((prev) => ({ ...prev, images: error }));
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);

    setFormData((prev) => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);

    // Validate after removal
    const error = validateField("images", newImages);
    setErrors((prev) => ({ ...prev, images: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const touchedFields = {};
    allFields.forEach((field) => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    // Validate entire form
    if (!validateForm()) {
      setIsSubmitting(false);
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert("Product listing submitted successfully!");
      setIsSubmitting(false);

      // Reset form on success
      setFormData({
        title: "",
        description: "",
        category: "",
        condition: "",
        price: "",
        negotiable: false,
        images: [],
      });
      setPreviewImages([]);
      setErrors({});
      setTouched({});
      setSearchCategory("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            List Your Product
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details below to list your product on GoRefurbish
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Title */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Product Information
            </h2>

            <Input
              label="Product Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              error={errors.title}
              touched={touched.title}
              placeholder="Enter a clear, descriptive title for your product"
              maxLength={100}
              showCharCount
              className="mb-6"
            />

            <Input
              label="Product Description"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              error={errors.description}
              touched={touched.description}
              placeholder="Describe your product's condition, features, age, and any other relevant details..."
              maxLength={1000}
              showCharCount
              rows={6}
              className="mb-6"
            />

            {/* Category Selection */}
            <div className="mb-6 relative">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Category *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchCategory}
                  onChange={(e) => {
                    setSearchCategory(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.category && touched.category
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                  placeholder="Search for a category..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {errors.category && touched.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category}</p>
              )}

              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <div key={category.id}>
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(category.name)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none font-medium text-gray-900 transition-colors"
                        >
                          {category.name}
                        </button>
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={() => handleCategorySelect(subcategory)}
                            className="w-full px-8 py-1 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm text-gray-600 transition-colors"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No categories found
                    </div>
                  )}
                </div>
              )}

              {formData.category && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {formData.category}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, category: "" }));
                        setSearchCategory("");
                      }}
                      className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Product Condition */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Condition *
              </label>
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    id="condition-new"
                    name="condition"
                    type="radio"
                    value="New"
                    checked={formData.condition === "New"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label
                    htmlFor="condition-new"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    New
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="condition-used"
                    name="condition"
                    type="radio"
                    value="Used"
                    checked={formData.condition === "Used"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label
                    htmlFor="condition-used"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Used
                  </label>
                </div>
              </div>
              {errors.condition && touched.condition && (
                <p className="text-sm text-red-600 mt-1">{errors.condition}</p>
              )}
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Product Images
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images * (Maximum 5 images)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600">
                  Click to upload images or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, JPEG, WebP up to 5MB each
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpg,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              {errors.images && touched.images && (
                <p className="text-sm text-red-600 mt-2">{errors.images}</p>
              )}
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({previewImages.length}/5)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-lg"
                          title="Remove image"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>

                        {/* Main image indicator */}
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                            Main
                          </div>
                        )}

                        {/* Image number overlay */}
                        <div className="absolute top-1 left-1 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">
                          {index + 1}
                        </div>
                      </div>

                      {/* Image info */}
                      <div className="mt-1 text-xs text-gray-500 text-center truncate">
                        Image {index + 1}
                        {index === 0 && (
                          <span className="text-primary-600 font-medium">
                            {" "}
                            (Main)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pricing
            </h2>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Selling Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  error={errors.price}
                  touched={touched.price}
                  placeholder="0.00"
                  inputClassName="pl-8"
                  className="mb-0"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="negotiable"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="negotiable"
                className="ml-2 block text-sm text-gray-700"
              >
                Price is negotiable
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                className="sm:flex-1"
              >
                {isSubmitting ? "Submitting..." : "List Product"}
              </Button>

              <Link to="/" className="sm:flex-1">
                <Button variant="secondary" size="lg" fullWidth>
                  Cancel
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              By listing your product, you agree to our{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductListing;
