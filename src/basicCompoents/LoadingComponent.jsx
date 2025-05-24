import React from "react"

function LoadingComponent() {
  return (
    <>
      <div className="min-h-screen bg-white p-4 md:p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    </>
  );
}

export default LoadingComponent
