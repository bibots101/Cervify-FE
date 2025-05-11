import React from "react";

const LoadingScreen = ({ progress, fadeOut }) => {
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center bg-cover bg-center relative transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundImage: "url('./Load_page.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-transparent to-teal-200 opacity-70" />

      <div className="relative z-10 flex flex-col items-center">
        <img
          src="./Logo.png"
          alt="Cervify logo"
          className="w-[70%] max-w-[500px] h-auto mb-6"
        />

        <div
          className="relative w-64 h-4 bg-gray-300 rounded-full overflow-hidden shadow-lg"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm font-medium text-gray-800">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
