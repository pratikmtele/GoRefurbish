import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/index.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock product data - in a real app, this would come from an API
  const mockProducts = [
    {
      id: 1,
      title: "iPhone 13 Pro Max - 256GB Space Gray",
      description:
        "Excellent condition iPhone 13 Pro Max with 256GB storage. Used for 8 months, always kept in case with screen protector. No scratches or dents. Battery health is at 95%. Comes with original box, charger, and unused EarPods. Perfect for someone looking for a premium smartphone at a great price. The device has been well-maintained and runs perfectly. All features including Face ID, cameras, and wireless charging work flawlessly.",
      category: "Smartphones",
      condition: "Used",
      price: "85000",
      negotiable: true,
      status: "Pending",
      images: [
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1611791179973-acf4d12bf5a2?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=600&fit=crop&auto=format",
      ],
      specifications: [
        { label: "Storage", value: "256GB" },
        { label: "Color", value: "Space Gray" },
        { label: "Condition", value: "Used - Excellent" },
        { label: "Battery Health", value: "95%" },
        { label: "Warranty", value: "None" },
        { label: "Accessories", value: "Box, Charger, EarPods" },
      ],
      seller: {
        name: "Rahul Kumar",
        location: "Mumbai, Maharashtra",
        memberSince: "2023-06-15",
        rating: 4.8,
        totalSales: 12,
      },
      createdAt: "2024-12-20",
      updatedAt: "2024-12-22",
    },
    {
      id: 2,
      title: "MacBook Air M2 - 512GB Silver",
      description:
        "Like new MacBook Air with M2 chip, 8GB RAM, and 512GB SSD. Purchased 3 months ago but need to upgrade to Pro for work requirements. Barely used, mostly kept on desk. No visible wear, all keys working perfectly. Comes with original packaging, charger, and documentation. Perfect for students or professionals looking for a reliable laptop.",
      category: "Laptops",
      condition: "Used",
      price: "115000",
      negotiable: false,
      status: "Approved",
      images: [
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      ],
      specifications: [
        { label: "Processor", value: "Apple M2 Chip" },
        { label: "RAM", value: "8GB" },
        { label: "Storage", value: "512GB SSD" },
        { label: "Screen Size", value: "13.6 inches" },
        { label: "Color", value: "Silver" },
        { label: "Condition", value: "Used - Like New" },
        { label: "Warranty", value: "9 months remaining" },
      ],
      seller: {
        name: "Priya Sharma",
        location: "Bangalore, Karnataka",
        memberSince: "2023-03-20",
        rating: 4.9,
        totalSales: 8,
      },
      createdAt: "2024-12-18",
      updatedAt: "2024-12-21",
    },
    {
      id: 3,
      title: "Sony WH-1000XM4 Noise Cancelling Headphones",
      description:
        "Premium wireless headphones with industry-leading noise cancellation. Used for 6 months, excellent condition. All features working perfectly including noise cancellation, touch controls, and voice assistant. Comes with carrying case, cables, and documentation. Great for music lovers and frequent travelers.",
      category: "Audio",
      condition: "Used",
      price: "18000",
      negotiable: true,
      status: "Approved",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&auto=format",
      ],
      specifications: [
        { label: "Type", value: "Over-ear Wireless" },
        { label: "Battery Life", value: "30 hours" },
        { label: "Noise Cancellation", value: "Active" },
        { label: "Color", value: "Black" },
        { label: "Condition", value: "Used - Excellent" },
        { label: "Accessories", value: "Case, Cables, Manual" },
      ],
      seller: {
        name: "Amit Patel",
        location: "Delhi, Delhi",
        memberSince: "2023-01-10",
        rating: 4.7,
        totalSales: 15,
      },
      createdAt: "2024-12-15",
      updatedAt: "2024-12-19",
    },
  ];

  useEffect(() => {
    const loadProduct = () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
        setIsLoading(false);
      }, 1000);
    };

    loadProduct();
  }, [id]);

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
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        text: "Pending Approval",
        className: "bg-yellow-100 text-yellow-800",
      },
      Approved: {
        text: "Listed",
        className: "bg-green-100 text-green-800",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
      >
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-96 bg-gray-200 rounded mb-4"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 w-20 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Product Not Found
            </h3>
            <p className="text-gray-500 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/browse">
              <Button variant="primary" size="lg">
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </li>
            <li>
              <Link to="/browse" className="hover:text-primary-600">
                My Products
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMzIwQzI2Ni4yNzQgMzIwIDMyMCAyNjYuMjc0IDMyMCAyMDBDMzIwIDE0NS43MjYgMjY2LjI3NCA5MiAyMDAgOTJDMTMzLjcyNiA5MiA4MCAxNDUuNzI2IDgwIDIwMEM4MCAyNjYuMjc0IDEzMy43MjYgMzIwIDIwMCAzMjBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMDAgMjgwQzI0NC4xODMgMjgwIDI4MCAyNDQuMTgzIDI4MCAyMDBDMjgwIDE1NS44MTcgMjQ0LjE4MyAxMjAgMjAwIDEyMEMxNTUuODE3IDEyMCAxMjAgMTU1LjgxNyAxMjAgMjAwQzEyMCAyNDQuMTgzIDE1NS44MTcgMjgwIDIwMCAyODBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMjAgOTJMMTYwIDUyTDIwMCA5MiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
                    e.target.alt = "Image not available";
                  }}
                />
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA2NEM1Mi4yNTMgNjQgNjQgNTIuMjUzIDY0IDQwQzY0IDI5LjE0NSA1Mi4yNTMgMTggNDAgMThDMjcuNzQ3IDE4IDE2IDI5LjE0NSAxNiA0MEMxNiA1Mi4yNTMgMjcuNzQ3IDY0IDQwIDY0WiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNDAgNTZDNDguODM2IDU2IDU2IDQ4LjgzNiA1NiA0MEM1NiAzMS4xNjQgNDguODM2IDI0IDQwIDI0QzMxLjE2NCAyNCAyNCAzMS4xNjQgMjQgNDBDMjQgNDguODM2IDMxLjE2NCA1NiA0MCA1NloiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI0IDE4TDMyIDEwTDQwIDE4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
                        e.target.alt = "Thumbnail not available";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Main Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.negotiable && (
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Negotiable
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <div className="text-gray-600">
                  {showFullDescription ? (
                    <p className="whitespace-pre-line">{product.description}</p>
                  ) : (
                    <p className="line-clamp-3">{product.description}</p>
                  )}
                  {product.description.length > 200 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="mt-2 text-primary-600 hover:text-primary-800 font-medium text-sm"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Link to={`/edit-product/${product.id}`}>
                <Button variant="primary" size="lg" fullWidth>
                  Edit Product
                </Button>
              </Link>
            </div>

            {/* Product Meta */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Listing Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Listed:</span>{" "}
                  {formatDate(product.createdAt)}
                </p>
                <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {formatDate(product.updatedAt)}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p>
                  <span className="font-medium">Product ID:</span> #{product.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
