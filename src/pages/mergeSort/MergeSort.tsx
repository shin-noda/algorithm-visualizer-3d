import { Canvas } from "@react-three/fiber";

// components
import MergeMiddleBar from "../../components/mergeMiddleBar/MergeMiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import StepsBoard from "../../components/stepsBoard/StepsBoard";
import Arrow from "../../components/arrow/Arrow";

// scenes
import MergeSortingScene from "../../scenes/mergeSortingScene/MergeSortingScene";

// hooks
import { useMergeSort } from "../../hooks/useMergeSort";

// css
import "./MergeSort.css";

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

      <div className="merge-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          <MergeSortingScene
            arr={array}
            merging={mergingIndices}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {comparingIndices.map((compIdx) => (
            <Arrow key={`comp-${compIdx}`} index={compIdx} arr={array} color="#4ade80" />
          ))}
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default MergeSort;