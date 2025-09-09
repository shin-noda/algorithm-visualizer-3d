// src/components/insertionMiddleBar/InsertionMiddleBar.tsx
import "./QuickMiddleBar.css";

interface QuickMiddleBarProps {
  onClick: () => void;
  steps: number;
  comparisons: number;
  pivots: number;
  swaps: number;
  isSorting: boolean;
  isFinished: boolean;
}

const QuickMiddleBar = ({
  onClick,
  steps,
  comparisons,
  pivots,
  swaps,
  isSorting,
  isFinished,
}: QuickMiddleBarProps) => {
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
        <span className="pivots">Pivots: {pivots}</span> |{" "}
        <span className="swaps">Swaps: {swaps}</span>
      </span>
    </div>
  );
};

export default QuickMiddleBar;