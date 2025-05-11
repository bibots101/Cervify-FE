import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ toggled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-pressed={toggled}
      title={toggled ? "Disable detailed labels" : "Enable detailed labels"}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
        toggled ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 transform ${
          toggled ? 'translate-x-8' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};

Toggle.propTypes = {
  toggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Toggle;
