// components
import TimMiddleBar from "../components/timMiddleBar/TimMiddleBar";
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import StepsBoard from "../components/stepsBoard/StepsBoard";
import Arrow from "../components/arrow/Arrow";

// scenes
import TimSortingScene from "../scenes/TimSortingScene";

// canvas
import SortingCanvas from "../canvas/SortingCanvas";

// hooks
import { useTimSort } from "../hooks/useTimSort";

const TimSort = () => {
  const {
    array,
    stepHistory,
    isSorting,
    isFinished,
    comparisons,
    merges,
    shifts,
    inserts,
    comparingIndices,
    insertingIndices,
    mergingIndices,
    resetArray,
    handleSort,
  } = useTimSort();

  return (
    <div className="main">
      <h1>Tim Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n log n)", worst: "O(n log n)" }}
        spaceComplexity="O(n)"
        stability="Stable"
      />

      <TimMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        shifts={shifts}
        inserts={inserts}
        merges={merges}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <SortingCanvas>
        <TimSortingScene
          arr={array}
          inserting={insertingIndices}
          merging={mergingIndices}
          maxBarHeight={5}
          barWidth={0.8}
        />

        {comparingIndices.map((compIdx) => (
          <Arrow key={`comp-${compIdx}`} index={compIdx} arr={array} color="#4ade80" />
        ))}
      </SortingCanvas>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default TimSort;