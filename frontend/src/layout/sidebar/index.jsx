import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ className }) => {
  const menuItems = [
    { icon: FaTachometerAlt, label: "Dashboard", path: "/admin-dashboard" },
    { icon: FaUsers, label: "Employees", path: "/admin-dashboard/employees" },
    {
      icon: FaBuilding,
      label: "Departments",
      path: "/admin-dashboard/departments",
    },
    { icon: FaCalendarAlt, label: "Leaves", path: "/admin-dashboard/leaves" },
    { icon: FaCog, label: "Setting", path: "/admin-dashboard/settings" },
  ];

  return (
    <div className={`flex w-64 flex-col bg-[#1a222c] text-white ${className}`}>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems?.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex w-full items-center space-x-3 rounded-md px-4 py-3 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-300 hover:bg-teal-600/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
