import ComplexityTable from "../components/complexityTable/ComplexityTable";
import InsertionMiddleBar from "../components/insertionMiddleBar/InsertionMiddleBar";
import Arrow from "../components/arrow/Arrow";
import StepsBoard from "../components/stepsBoard/StepsBoard";

// scenes
import InsertionSortingScene from "../scenes/InsertionSortingScene";

// canvas
import SortingCanvas from "../canvas/SortingCanvas";

// hooks
import { useInsertionSort } from "../hooks/useInsertionSort";

const InsertionSort = () => {
  const {
    array,
    isSorting,
    comparisons,
    shifts,
    inserts,
    comparingIndices,
    insertingIndices,
    stepHistory,
    handleSort,
    resetArray,
    isFinished,
  } = useInsertionSort();

  return (
    <div className="main">
      <h1>Insertion Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
        stability="Stable"
      />

      <InsertionMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        shifts={shifts}
        inserts={inserts}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <SortingCanvas>
        <InsertionSortingScene
          arr={array}
          comparing={comparingIndices}
          inserting={insertingIndices}
          maxBarHeight={5}
          barWidth={0.8}
        />

        {/* Optional arrows for highlighting */}
        {comparingIndices.map((compIdx, i) => {
          if (compIdx === -1) return null; // skip held element
          return (
            <Arrow
              key={`comp-${i}`}
              index={compIdx}
              arr={array}
              color="#4ade80"
            />
          );
        })}
      </SortingCanvas>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default InsertionSort;