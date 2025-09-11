// src/pages/shellSort/ShellSort.tsx
import { Canvas } from "@react-three/fiber";

// components
import ShellMiddleBar from "../../components/shellMiddleBar/ShellMiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import StepsBoard from "../../components/stepsBoard/StepsBoard";
import Arrow from "../../components/arrow/Arrow";

// scenes
import ShellSortingScene from "../../scenes/shellSortingScene/ShellSortingScene";

// hooks
import { useShellSort } from "../../hooks/useShellSort";

// css
import "./ShellSort.css";

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

      <div className="shell-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

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
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default ShellSort;