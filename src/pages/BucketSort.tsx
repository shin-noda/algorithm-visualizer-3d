// src/pages/BucketSort.tsx
import { useBucketSort } from "../hooks/useBucketSort";

// components
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import NonComparisonMiddleBar from "../components/nonComparisonMiddleBar/NonComparisonMiddleBar";

// scenes
import BucketSortingScene from "../scenes/BucketSortingScene";

const BucketSort = () => {
  const {
    array,
    bucketArray,
    outputArray,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  } = useBucketSort();

  return (
    <div className="main">
      <h1>Bucket Sort</h1>

      <ComplexityTable
        timeComplexity={{
          best: "O(n + k)",
          average: "O(n + k)",
          worst: "O(n²)",
        }}
        spaceComplexity="O(n + k)"
        stability="Unstable (depends on inner sort)"
      />

      {/* Middle Bar */}
      <NonComparisonMiddleBar
        isSorting={isSorting}
        isFinished={isFinished}
        onReset={resetArray}
        onStart={handleSort}
      />

      {/* 3D Bucket Sort Scene */}
      <BucketSortingScene
        input={array}
        bucket={bucketArray}
        output={outputArray}
        active={active}
        showLabels={true}
        count={[]}
      />
    </div>
  );
};

export default BucketSort;