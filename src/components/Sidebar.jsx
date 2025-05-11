import React from "react";
import Toggle from "./ui/toggle"; // Correct default import

const Sidebar = ({ isCervifyOn, handleCervifyToggle, outputText }) => (
  <div className="w-[280px] p-4 bg-white rounded-2xl shadow-md border border-purple-100 flex flex-col justify-between">
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Toggle toggled={isCervifyOn} onToggle={handleCervifyToggle} />
        <span className="text-lg font-semibold text-purple-700">Cervify</span>
      </div>
      <div className="bg-gray-100 h-64 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-line">
        {outputText}
      </div>
    </div>
    <div className="flex flex-col items-center space-y-2 mt-4">
      <button className="text-sm text-blue-600 hover:underline">Help</button>
      <button className="text-sm text-blue-600 hover:underline">Settings</button>
    </div>
  </div>
);

export default Sidebar;
