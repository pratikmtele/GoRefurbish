import React from "react";

const ProductCard = ({
  title,
  price,
  location,
  postedDate,
  imageUrl,
  imageAlt,
  status = "Approved",
  onFavoriteClick,
}) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <div
          className={`absolute top-4 left-4 px-3 py-1 ${getStatusColor(
            status
          )} text-white text-sm font-medium rounded-full`}
        >
          {status}
        </div>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover object-top"
        />
        <button
          className="absolute w-10 top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={onFavoriteClick}
        >
          <i className="far fa-heart text-gray-600"></i>
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 flex-1 mr-2">
            {title}
          </h3>
          <span className="text-lg font-bold text-primary-600 flex-shrink-0">
            ₹{price}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-500">Posted {postedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
