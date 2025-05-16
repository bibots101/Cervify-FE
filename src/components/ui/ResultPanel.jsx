import React, { useState, useEffect, useRef, useCallback } from "react";
import Toggle from "./toggle";

const ResultPanel = ({ hoveredInfo, setHoveredInfo,setPanTargetIndex }) => {
  const [isActive, setIsActive] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const scrollPanelRef = useRef(null);
  const internalHoverRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const hoveredIndex = hoveredInfo?.index;

  const handleToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("cervify_prediction");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPredictions(parsed);
        }
      } catch (err) {
        console.error("Failed to parse cervify_prediction:", err);
      }
    }
  }, []);

  return (
    <div className="w-full p-[2px] rounded-2xl">
      <div className="rounded-2xl bg-gray-50/10 backdrop-blur-md p-4 flex flex-col h-auto">
        <div className="flex-shrink-0 flex  items-center justify-center gap-4 mb-2">
          <span className="font-semibold text-gray-800">Cervify</span>
          <Toggle toggled={isActive} onToggle={handleToggle} />
        </div>

        <div
          ref={scrollPanelRef}
          className="flex-grow overflow-y-auto bg-white p-2 rounded-xl text-sm text-gray-700 overflow-auto"
        >
          {predictions.length > 0 ? (
            <div className="space-y-2">
              {predictions.map((item, idx) => (
                <div
                  key={idx}
                  id={`prediction-${idx}`}
                  onMouseEnter={() => {
                    clearTimeout(scrollTimeoutRef.current);
                    internalHoverRef.current = true;
                    setHoveredInfo({index: idx, source: "resultPanel"});
                  }}
                  onClick={() =>{
                    setPanTargetIndex(idx);
                  }}
                  onMouseLeave={() => {
                    internalHoverRef.current = false;
                    setHoveredInfo({ index: null, source: "resultPanel" });

                  }}
                  onBlur={() =>{
                    setPanTargetIndex(null);
                  }}
                  className={`bg-gray-100 p-2 rounded-md shadow transition ${
                    hoveredIndex === idx
                      ? "bg-yellow-100 ring-2 ring-yellow-500"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <div>
                    <strong>Label:</strong>{" "}
                    {isActive
                      ? item.label
                      : item.label?.toLowerCase() === "nilm"
                      ? "Normal"
                      : "Abnormal"}
                  </div>
                  <div>
                    <strong>Confidence:</strong>{" "}
                    {item.confidence
                      ? `${(+item.confidence * 100).toFixed(2)}%`
                      : "N/A"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No predictions available.</div>
          )}
        </div>

        <div className="mt-4 flex-shrink-0 text-xs text-gray-600 text-center space-y-1">
          <button className="hover:underline block w-full">Help</button>
          <button className="hover:underline block w-full">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
