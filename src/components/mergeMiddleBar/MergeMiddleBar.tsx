// src/components/mergeMiddleBar/MergeMiddleBar.tsx
import "./MergeMiddleBar.css";

interface MergeMiddleBarProps {
  onClick: () => void;
  steps: number;
  comparisons: number;
  merges: number;
  isSorting: boolean;
  isFinished: boolean;
}

const MergeMiddleBar = ({
  onClick,
  steps,
  comparisons,
  merges,
  isSorting,
  isFinished,
}: MergeMiddleBarProps) => {
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
        <span className="merges">Merges: {merges}</span>
      </span>
    </div>
  );
};

export default MergeMiddleBar;