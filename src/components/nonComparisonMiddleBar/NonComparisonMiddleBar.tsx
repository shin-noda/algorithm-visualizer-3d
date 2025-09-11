// src/components/nonComparisonMiddleBar/NonComparisonMiddleBar.tsx
import React from "react";

interface NonComparisonMiddleBarProps {
  isSorting: boolean;
  isFinished: boolean;
  onReset: () => void;
  onStart: () => void;
}

const NonComparisonMiddleBar: React.FC<NonComparisonMiddleBarProps> = ({
  isSorting,
  isFinished,
  onReset,
  onStart,
}) => {
  return (
    <div className="middle-bar">
      <button
        onClick={isFinished ? onReset : onStart}
        style={{
          backgroundColor: isSorting
            ? "#d3d3d3"
            : isFinished
            ? "#90ee90"
            : "#38bdf8",
          cursor: isSorting ? "not-allowed" : "pointer",
        }}
        disabled={isSorting}
      >
        {isSorting ? "Processing..." : isFinished ? "Restart" : "Start"}
      </button>
    </div>
  );
};

export default NonComparisonMiddleBar;