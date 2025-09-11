// src/pages/CountingSort.tsx
import { useCountingSort } from "../hooks/useCountingSort";
import CountingSortingScene from "../scenes/CountingSortingScene";

const CountingSort = () => {
  const { array, countArray, outputArray, active, isSorting, isFinished, resetArray, handleSort } = useCountingSort();

  return (
    <div className="main">
      <h1>Counting Sort</h1>

      <div className="middle-bar">
        <button
          onClick={isFinished ? resetArray : handleSort}
          style={{
            backgroundColor: isSorting ? "#d3d3d3" : isFinished ? "#90ee90" : "#38bdf8",
          }}
        >
          {isSorting ? "Processing..." : isFinished ? "Restart" : "Start"}
        </button>
      </div>

      <CountingSortingScene input={array} count={countArray} output={outputArray} active={active} />
    </div>
  );
};

export default CountingSort;