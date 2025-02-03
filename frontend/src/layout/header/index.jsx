import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar, handleLogout, authData }) => {
  return (
    <header className="bg-teal-600 px-6 py-3 flex items-center justify-between text-white shadow-md">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 -ml-2 rounded-md hover:bg-teal-600"
      >
        <FaBars className="h-5 w-5" />
      </button>
      <div className="flex gap-10">
        <div className="text-xl font-serif italic">Employee MS</div>

        <div className="text-lg capitalize">
          Welcome, {authData?.user?.role}
        </div>
      </div>

      <button
        className="bg-teal-800 px-4 py-1.5 rounded hover:bg-teal-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
