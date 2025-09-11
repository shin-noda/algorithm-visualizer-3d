// src/pages/shellSort/ShellSort.tsx
// components
import ShellMiddleBar from "../components/shellMiddleBar/ShellMiddleBar";
import ComplexityTable from "../components/complexityTable/ComplexityTable";
import StepsBoard from "../components/stepsBoard/StepsBoard";
import Arrow from "../components/arrow/Arrow";

// scenes
import ShellSortingScene from "../scenes/ShellSortingScene";

// canvas
import SortingCanvas from "../canvas/SortingCanvas";

// hooks
import { useShellSort } from "../hooks/useShellSort";

const ShellSort = () => {
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
  } = useShellSort();

  return (
    <div className="main">
      <h1>Shell Sort</h1>

      <ComplexityTable
        timeComplexity={{
            best: "O(n log n)",
            average: "O(n³ᐟ²)",
            worst: "O(n²)"
        }}
        spaceComplexity="O(1)"
        stability="Unstable"
      />

      <ShellMiddleBar
        onClick={isFinished ? resetArray : handleSort}
        steps={stepHistory.length}
        comparisons={comparisons}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <SortingCanvas>
        <ShellSortingScene
          arr={array}
          swapping={swappingIndices}
          comparing={comparingIndices}
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

export default ShellSort;