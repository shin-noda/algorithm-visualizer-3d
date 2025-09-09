import { Canvas } from "@react-three/fiber";

// components
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import InsertionMiddleBar from "../../components/insertionMiddleBar/InsertionMiddleBar";
import Arrow from "../../components/arrow/Arrow";
import StepsBoard from "../../components/stepsBoard/StepsBoard";

// hooks
import { useInsertionSort } from "../../hooks/useInsertionSort";

// css
import "./InsertionSort.css";

const InsertionSort = () => {
  const {
    arr,
    isSorting,
    comparisons,
    shifts,
    inserts,
    comparing,
    shifting,
    stepsHistory,
    steps,
    isFinished,
    startOrRestart,
  } = useInsertionSort();

  return (
    <div className="main">
      <h1>Insertion Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
        stability="Stable"
      />

      <InsertionMiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        shifts={shifts}
        inserts={inserts}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="insertion-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          <SortingScene arr={arr} swapping={shifting} maxBarHeight={5} barWidth={0.8} />

          {comparing !== null && <Arrow index={comparing} arr={arr} color="lightgreen" />}
        </Canvas>
      </div>

      <StepsBoard steps={stepsHistory} />
    </div>
  );
};

export default InsertionSort;