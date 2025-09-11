// src/pages/heapSort/HeapSort.tsx
// components
import HeapMiddleBar from "../components/heapMiddleBar/HeapMiddleBar";
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import StepsBoard from "../components/stepsBoard/StepsBoard";
import Arrow from "../components/arrow/Arrow";

// scenes
import HeapSortingScene from "../scenes/HeapSortingScene";

// canvas
import SortingCanvas from "../canvas/SortingCanvas";

// hooks
import { useHeapSort } from "../hooks/useHeapSort";

const HeapSort = () => {
  const {
    array,
    stepHistory,
    isSorting,
    isFinished,
    comparisons,
    swaps,
    comparingIndices,
    swappingIndices,
    resetArray,
    handleSort,
  } = useHeapSort();

  return (
    <div className="main">
      <h1>Heap Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }}
        spaceComplexity="O(1)"
        stability="Unstable"
      />

      <HeapMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <SortingCanvas>
        <HeapSortingScene
          arr={array}
          swapping={swappingIndices}
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

export default HeapSort;