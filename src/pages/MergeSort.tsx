// components
import MergeMiddleBar from "../components/mergeMiddleBar/MergeMiddleBar";
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import StepsBoard from "../components/stepsBoard/StepsBoard";
import Arrow from "../components/arrow/Arrow";

// scenes
import MergeSortingScene from "../scenes/MergeSortingScene";

// canvas
import SortingCanvas from "../canvas/SortingCanvas";

// hooks
import { useMergeSort } from "../hooks/useMergeSort";

const MergeSort = () => {
  const {
    array,
    stepHistory,
    isSorting,
    isFinished,
    comparisons,
    merges,
    comparingIndices,
    mergingIndices,
    resetArray,
    handleSort,
  } = useMergeSort();

  return (
    <div className="main">
      <h1>Merge Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }}
        spaceComplexity="O(n)"
        stability="Stable"
      />

      <MergeMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        merges={merges}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <SortingCanvas>
        <MergeSortingScene
          arr={array}
          merging={mergingIndices}
          maxBarHeight={5}
          barWidth={0.8}
        />
        
        {comparingIndices.map(idx => (
          <Arrow key={idx} index={idx} arr={array} color="#4ade80" />
        ))}
      </SortingCanvas>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default MergeSort;