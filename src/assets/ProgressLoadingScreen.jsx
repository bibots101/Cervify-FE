import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressLoadingScreen = ({ progress, message, fadeOut }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center transition-opacity duration-1000 ${
          fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ backgroundImage: "url('./Load_page.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-transparent to-teal-200 opacity-70" />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="./Logo.png"
            alt="Cervify logo"
            className="w-[70%] max-w-[500px] h-auto mb-6"
          />

          <div className="text-xl font-semibold text-gray-700 mb-2 text-center">
            {message}
          </div>

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
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressLoadingScreen;
