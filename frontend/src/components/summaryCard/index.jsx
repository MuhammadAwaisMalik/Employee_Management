import React from "react";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaFileAlt,
  FaCheck,
  FaHourglassHalf,
  FaTimes,
} from "react-icons/fa";

const iconMap = {
  employees: FaUsers,
  departments: FaBuilding,
  pay: FaMoneyBill,
  applied: FaFileAlt,
  approved: FaCheck,
  pending: FaHourglassHalf,
  rejected: FaTimes,
};

const colorMap = {
  teal: "bg-emerald-600",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  green: "bg-green-500",
};

const SummaryCard = ({ title, value, icon, color = "teal" }) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <div className={`${colorMap[color]} p-3 rounded-lg`}>
        <IconComponent className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-gray-900 text-xl font-semibold">
          {typeof value === "number" && title.includes("Pay")
            ? `$${value}`
            : value}
        </p>
      </div>
    </div>
  );
};
export default SummaryCard;
