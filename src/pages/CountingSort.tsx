// src/pages/CountingSort.tsx
import { useCountingSort } from "../hooks/useCountingSort";
import CountingSortingScene from "../scenes/CountingSortingScene";
import ComplexityTable from "../components/complexityTable/ComplexityTable";

const CountingSort = () => {
  const {
    array,
    countArray,
    outputArray,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  } = useCountingSort();

  return (
    <div className="main">
      <h1>Counting Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n + k)", average: "O(n + k)", worst: "O(n + k)" }}
        spaceComplexity="O(n + k)"
        stability="Stable"
      />

      {/* Middle Bar */}
      <div className="middle-bar">
        <button
          onClick={isFinished ? resetArray : handleSort}
          style={{
            backgroundColor: isSorting ? "#d3d3d3" : isFinished ? "#90ee90" : "#38bdf8",
            cursor: isSorting ? "not-allowed" : "pointer",
          }}
          disabled={isSorting}
        >
          {isSorting ? "Processing..." : isFinished ? "Restart" : "Start"}
        </button>
      </div>

      {/* 3D Sorting Scene */}
      <CountingSortingScene
        input={array}
        count={countArray}
        output={outputArray}
        active={active} // now an array of highlights
        showLabels={true}
      />
    </div>
  );
};

export default CountingSort;