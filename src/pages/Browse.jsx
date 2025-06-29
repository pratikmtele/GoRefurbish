import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const mockProducts = [
    {
      id: 1,
      title: "iPhone 13 Pro Max - 256GB Space Gray",
      description:
        "Excellent condition iPhone 13 Pro Max with 256GB storage. Used for 8 months, always kept in case...",
      category: "Smartphones",
      condition: "Used",
      price: "85000",
      negotiable: true,
      status: "Pending",
      images: [
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1611791179973-acf4d12bf5a2?w=400&h=400&fit=crop&auto=format",
      ],
      createdAt: "2024-12-20",
      updatedAt: "2024-12-22",
    },
    {
      id: 2,
      title: "MacBook Air M2 - 512GB Silver",
      description:
        "Like new MacBook Air with M2 chip, 8GB RAM, and 512GB SSD. Purchased 3 months ago but need to upgrade...",
      category: "Laptops",
      condition: "Used",
      price: "115000",
      negotiable: false,
      status: "Approved", // Changed from "active"
      images: [
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format",
      ],
      createdAt: "2024-12-18",
      updatedAt: "2024-12-21",
    },
    {
      id: 3,
      title: "Sony WH-1000XM4 Noise Cancelling Headphones",
      description:
        "Premium wireless headphones with industry-leading noise cancellation. Used for 6 months, excellent condition...",
      category: "Audio",
      condition: "Used",
      price: "18000",
      negotiable: true,
      status: "Approved",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
      ],
      createdAt: "2024-12-15",
      updatedAt: "2024-12-19",
    },
  ];

  // Load products on component mount
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setProducts(mockProducts);
        setIsLoading(false);
      }, 1000);
    };

    loadProducts();
  }, []);

  // Filter products based on selected filter
  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.status.toLowerCase() === filter.toLowerCase();
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        text: "Pending",
        className: "bg-yellow-100 text-yellow-800",
      },
      Approved: {
        text: "Approved",
        className: "bg-green-100 text-green-800",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                My Products
              </h1>
              <p className="text-lg text-gray-600">
                Manage your listed products on GoRefurbish
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/list-product">
                <Button variant="primary" size="lg">
                  List New Product
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex space-x-1">
            {[
              { key: "all", label: "All Products", count: products.length },
              {
                key: "pending",
                label: "Pending",
                count: products.filter((p) => p.status === "Pending").length,
              },
              {
                key: "approved",
                label: "Approved",
                count: products.filter((p) => p.status === "Approved").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all"
                ? "No products listed yet"
                : `No ${filter} products`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "Start selling by listing your first product."
                : `You don't have any ${filter} products at the moment.`}
            </p>
            {filter === "all" && (
              <Link to="/list-product">
                <Button variant="primary" size="lg">
                  List Your First Product
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMjQwQzIzMy4xMzcgMjQwIDI2MCAyMTMuMTM3IDI2MCAxODBDMjYwIDEzNi44NjMgMjMzLjEzNyAxMTAgMjAwIDExMEMxNjYuODYzIDExMCAxNDAgMTM2Ljg2MyAxNDAgMTgwQzE0MCAyMTMuMTM3IDE2Ni44NjMgMjQwIDIwMCAyNDBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMDAgMjAwQzIxMS4wNDYgMjAwIDIyMCAxOTEuMDQ2IDIyMCAxODBDMjIwIDE2OC45NTQgMjExLjA0NiAxNjAgMjAwIDE2MEM4OC45NTQgMTYwIDE4MCA2OC45NTQgMTgwIDE4MEMxODAgMTkxLjA0NiAxODguOTU0IDIwMCAyMDAgMjAwWiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQwIDExMEwxNzAgODBMMjAwIDExMCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
                      e.target.alt = "Image not available";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(product.status)}
                  </div>
                  {product.negotiable && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Negotiable
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(product.price)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.category} • {product.condition}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link to={`/edit-product/${product.id}`} className="flex-1">
                      <Button variant="primary" size="sm" fullWidth>
                        Edit Product
                      </Button>
                    </Link>

                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 text-center">
                    Updated {formatDate(product.updatedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
