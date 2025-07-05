import React from "react";

const CategoryCard = ({
  title,
  itemCount,
  icon,
  bgColor = "bg-gray-50",
  iconBgColor = "bg-gray-100",
  iconColor = "text-gray-600",
  onClick,
}) => {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 mx-auto mb-4 ${iconBgColor} rounded-full flex items-center justify-center`}
      >
        <i className={`fas ${icon} ${iconColor} text-2xl`}></i>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{itemCount} items</p>
    </div>
  );
};

export default CategoryCard;
