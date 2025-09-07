import "./ComplexityTable.css";

interface ComplexityTableProps {
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
}

const ComplexityTable = ({ timeComplexity, spaceComplexity }: ComplexityTableProps) => {
  return (
    <div className="complexity-table">
      <div className="row header">
        <div className="cell">Complexity Type</div>
        <div className="cell">Complexity</div>
      </div>

      <div className="row">
        <div className="cell">Time Complexity</div>
        <div className="cell">
          <div className="cell-content">
            <div>Best: {timeComplexity.best}</div>
            <div>Average: {timeComplexity.average}</div>
            <div>Worst: {timeComplexity.worst}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="cell">Space Complexity</div>
        <div className="cell">{spaceComplexity}</div>
      </div>
    </div>
  );
};

export default ComplexityTable;