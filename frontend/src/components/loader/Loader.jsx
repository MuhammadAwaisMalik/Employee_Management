import React from "react";

function MyLoader({ type, color }) {
  return (
    <div
      className={`animate-spin rounded-full ${
        type === "small" ? "h-5 w-5" : "h-8 w-8"
      }   border-t-2 border-b-2 border-solid   ${
        color === "white" ? "border-white" : "border-gray-800"
      }`}
    ></div>
  );
}

export default MyLoader;
