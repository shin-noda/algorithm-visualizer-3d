// src/pages/RadixSort.tsx
import { useRadixSort } from "../hooks/useRadixSort";

// components
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import NonComparisonMiddleBar from "../components/nonComparisonMiddleBar/NonComparisonMiddleBar";

// scenes
import RadixSortingScene from "../scenes/RadixSortingScene";

const RadixSort = () => {
  const {
    array,
    bucketArray,
    outputArray,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  } = useRadixSort();

  return (
    <div className="main">
      <h1>Radix Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(nk)", average: "O(nk)", worst: "O(nk)" }}
        spaceComplexity="O(n + k)"
        stability="Stable"
      />

      {/* Middle Bar */}
      <NonComparisonMiddleBar
        isSorting={isSorting}
        isFinished={isFinished}
        onReset={resetArray}
        onStart={handleSort}
      />

      {/* 3D Radix Sort Scene */}
      <RadixSortingScene
        input={array}
        bucket={bucketArray}
        output={outputArray}
        active={active}
        showLabels={true}
        count={[]}/>
    </div>
  );
};

export default RadixSort;