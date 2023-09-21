import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isLoading ? "" : "hidden"
      }`}
    >
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-3 border-black"></div>
    </div>
  );
};

export default Loader;
