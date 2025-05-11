// components/AnimatedDetails.jsx
import React, { useRef, useEffect, useState } from "react";

const AnimatedDetails = ({ summary, children }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open) {
      const sectionHeight = el.scrollHeight;
      el.style.height = sectionHeight + "px";
      const timeout = setTimeout(() => (el.style.height = "auto"), 300);
      return () => clearTimeout(timeout);
    } else {
      const sectionHeight = el.scrollHeight;
      el.style.height = sectionHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [open]);

  return (
    <div className="border-b pb-2 transition-all">
      <button
        className="w-full text-left text-blue-700 font-semibold text-lg py-2 hover:underline"
        onClick={() => setOpen(!open)}
      >
        {summary}
      </button>
      <div
        ref={ref}
        style={{ height: "0px", overflow: "hidden", transition: "height 0.3s ease" }}
      >
        <div className="pt-2 text-gray-700 text-sm">{children}</div>
      </div>
    </div>
  );
};

export default AnimatedDetails;
