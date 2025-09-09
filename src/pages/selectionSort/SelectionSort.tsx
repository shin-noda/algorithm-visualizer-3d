import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import Arrow from "../../components/arrow/Arrow";
import StepsBoard from "../../components/stepsBoard/StepsBoard";

// hooks
import { useSelectionSort } from "../../hooks/useSelectionSort";

// css
import "./SelectionSort.css";

const SelectionSort = () => {
  const {
    arr,
    isSorting,
    comparisons,
    swaps,
    comparing,
    currentMin,
    swapping,
    stepHistory,
    steps,
    isFinished,
    startOrRestart,
  } = useSelectionSort();

  return (
    <div className="main">
      <h1>Selection Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n²)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
        stability="Unstable"
      />

      <MiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="selection-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          <SortingScene arr={arr} swapping={swapping} maxBarHeight={5} barWidth={0.8} />

          {comparing !== null && <Arrow index={comparing} arr={arr} color="lightgreen" />}
          {currentMin !== null && <Arrow index={currentMin} arr={arr} color="orange" />}
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default SelectionSort;