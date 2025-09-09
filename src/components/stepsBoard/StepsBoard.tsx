import { useEffect, useRef } from "react";
import "./StepsBoard.css";

// types
import type { Step } from "../../types/Step";

interface StepsBoardProps {
  steps: Step[];
}

const StepsBoard = ({ steps }: StepsBoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const getProcedureName = (type: Step['type']) => {
    switch (type) {
      case "comparison": return "Compare";
      case "shift": return "Shift";
      case "insert": return "Insert";
      case "swap": return "Swap";
      case "pivot": return "Pivot";
      case "merge": return "Merge";
      default: return "Unknown";
    }
  };

  useEffect(() => {
    if (boardRef.current) {
      // scroll the board itself to the bottom
      boardRef.current.scrollTop = boardRef.current.scrollHeight;
    }
  }, [steps]);

  return (
    <div className="steps-board" ref={boardRef}>
      <h2 className="board-header">Steps History</h2>

      <div className="steps-grid">
        <div className="row header">
          <div className="cell">Step</div>
          <div className="cell">Procedure</div>
          <div className="cell">Indexes</div>
          <div className="cell">Array</div>
        </div>

        {steps.map((step, idx) => (
          <div className="row" key={idx}>
            <div className="cell">{idx + 1}</div>
            <div className="cell">{getProcedureName(step.type)}</div>
            <div className="cell">[{step.indices.join(", ")}]</div>
            <div className="cell">[{step.array?.join(", ")}]</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsBoard;