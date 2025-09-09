// src/pages/bubbleSort/BubbleSort.tsx
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import Arrow from "../../components/arrow/Arrow";
import StepsBoard from "../../components/stepsBoard/StepsBoard";

// css
import "./BubbleSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

type Step = {
  type: "comparison" | "swap";
  indices: number[];
  array: number[];
};

const BubbleSort = () => {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 0 && j === 0) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(0);
      setJ(0);
      setComparisons(0);
      setSwaps(0);
      setComparing([]);
      setSwapping([]);
      setStepHistory([]);
    }
  };

  const steps = comparisons + swaps;
  const isFinished = !isSorting && i >= arr.length;

  useEffect(() => {
    if (!isSorting) return;
    if (i >= arr.length) {
      setIsSorting(false);
      setComparing([]);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      if (i < arr.length) {
        if (j < arr.length - i - 1) {
          setComparing([j, j + 1]);

          // Record comparison step with array state
          setStepHistory((prev) => [
            ...prev,
            { type: "comparison", indices: [j, j + 1], array: [...arr] },
          ]);
          setComparisons((prev) => prev + 1);

          if (arr[j] > arr[j + 1]) {
            const newArr = [...arr];
            [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
            setArr(newArr);
            setSwapping([j, j + 1]);

            // Record swap step with updated array
            setStepHistory((prev) => [
              ...prev,
              { type: "swap", indices: [j, j + 1], array: [...newArr] },
            ]);
            setSwaps((prev) => prev + 1);
          } else {
            setSwapping([]);
          }

          setJ((prev) => prev + 1);
        } else {
          setJ(0);
          setI((prev) => prev + 1);
        }
      } else {
        setIsSorting(false);
        setComparing([]);
        setSwapping([]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j]);

  return (
    <div className="main">
      <h1>Bubble Sort</h1>

      <ComplexityTable
        timeComplexity={{
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)"
        }}
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

          {/* Bars */}
          <SortingScene
            arr={arr}
            swapping={swapping}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Arrows above comparing bars */}
          {comparing.map((index) => (
            <Arrow key={index} index={index} arr={arr} color="lightgreen" />
          ))}
        </Canvas>
      </div>

      {/* Steps board */}
      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default BubbleSort;