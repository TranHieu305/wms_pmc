import React from "react";

const NoPermissionPage = () => {
  const handleReturn = () => {
    // Navigate to the desired page (e.g., home)
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          You don't have permission to access this page
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Please contact your administrator if you believe this is a mistake.
        </p>
        <button
          onClick={handleReturn}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NoPermissionPage;
