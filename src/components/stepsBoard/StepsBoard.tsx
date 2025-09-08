// src/components/stepsBoard/StepsBoard.tsx
import "./StepsBoard.css";

type Step = {
  type: "comparison" | "swap";
  indices: number[];
  array: number[]; // <-- store current array state in each step
};

interface StepsBoardProps {
  steps: Step[];
}

const StepsBoard = ({ steps }: StepsBoardProps) => {
  return (
    <div className="steps-board">
      <h3>Steps History</h3>

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
            <div className="cell">{step.type === "comparison" ? "Compare" : "Swap"}</div>
            <div className="cell">[{step.indices.join(", ")}]</div>
            <div className="cell">[{step.array.join(", ")}]</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsBoard;