// src/components/stepsBoard/StepsBoard.tsx
import "./StepsBoard.css";

// types
import type { Step } from "../../types/Step";

interface StepsBoardProps {
  steps: Step[];
}

const StepsBoard = ({ steps }: StepsBoardProps) => {
  const getProcedureName = (type: Step['type']) => {
    switch (type) {
      case "comparison":
        return "Compare";
      case "shift":
        return "Shift";
      case "insert":
        return "Insert";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="steps-board">
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