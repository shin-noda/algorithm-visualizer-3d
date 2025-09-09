import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import Arrow from "../../components/arrow/Arrow";
import StepsBoard from "../../components/stepsBoard/StepsBoard";

// hooks
import { useBubbleSort } from "../../hooks/useBubbleSort";

// css
import "./BubbleSort.css";

const BubbleSort = () => {
  const {
    arr,
    isSorting,
    comparisons,
    swaps,
    comparing,
    swapping,
    stepHistory,
    steps,
    isFinished,
    startOrRestart,
  } = useBubbleSort();

  return (
    <div className="main">
      <h1>Bubble Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
        stability="Stable"
      />

      <MiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="bubble-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          <SortingScene arr={arr} swapping={swapping} maxBarHeight={5} barWidth={0.8} />

          {comparing.map((index) => (
            <Arrow key={index} index={index} arr={arr} color="lightgreen" />
          ))}
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default BubbleSort;