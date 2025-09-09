import { Canvas } from "@react-three/fiber";

// components
import QuickMiddleBar from "../../components/quickMiddleBar/QuickMiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import StepsBoard from "../../components/stepsBoard/StepsBoard";
import Arrow from "../../components/arrow/Arrow";

// scenes
import QuickSortingScene from "../../scenes/quickSortingScene/QuickSortingScene";

// hooks
import { useQuickSort } from "../../hooks/useQuickSort";

// css
import "./QuickSort.css";

const QuickSort = () => {
  const {
    array,
    stepHistory,
    isSorting,
    isFinished,
    comparisons,
    swaps,
    pivots,
    comparingIndices,
    swappingIndices,
    pivotIndices,
    resetArray,
    handleSort,
  } = useQuickSort();

  return (
    <div className="main">
      <h1>Quick Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" }}
        spaceComplexity="O(log n)"
        stability="Unstable"
      />

      <QuickMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        pivots={pivots}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="quick-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          <QuickSortingScene
            arr={array}
            swapping={swappingIndices}
            pivots={pivotIndices}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {pivotIndices.map((pivotIdx) => (
            <Arrow key={`pivot-${pivotIdx}`} index={pivotIdx} arr={array} color="#facc15" />
          ))}

          {comparingIndices.map((compIdx) => (
            <Arrow key={`comp-${compIdx}`} index={compIdx} arr={array} color="#4ade80" />
          ))}
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default QuickSort;