// src/components/insertionMiddleBar/InsertionMiddleBar.tsx
import "./InsertionMiddleBar.css";

interface InsertionMiddleBarProps {
  onClick: () => void;
  steps: number;
  comparisons: number;
  shifts: number;
  inserts: number;
  isSorting: boolean;
  isFinished: boolean;
}

const InsertionMiddleBar = ({
  onClick,
  steps,
  comparisons,
  shifts,
  inserts,
  isSorting,
  isFinished,
}: InsertionMiddleBarProps) => {
  let buttonText = "Start";
  let buttonColor = "#38bdf8"; // light blue

  if (isSorting) {
    buttonText = "Processing...";
    buttonColor = "#d3d3d3"; // light grey
  } else if (isFinished) {
    buttonText = "Restart";
    buttonColor = "#90ee90"; // light green
  }

  return (
    <div className="middle-bar">
      <button
        onClick={onClick}
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </button>
      <span className="middle-bar-text">
        Steps: {steps} |{" "}
        <span className="comparisons">Comparisons: {comparisons}</span> |{" "}
        <span className="shifts">Shifts: {shifts}</span> |{" "}
        <span className="inserts">Inserts: {inserts}</span>
      </span>
    </div>
  );
};

export default InsertionMiddleBar;