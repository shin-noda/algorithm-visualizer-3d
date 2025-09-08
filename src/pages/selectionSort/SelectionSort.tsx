// src/pages/selectionSort/SelectionSort.tsx
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import Arrow from "../../components/arrow/Arrow";

// css
import "./SelectionSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

const SelectionSort = () => {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number | null>(null);
  const [currentMin, setCurrentMin] = useState<number | null>(null);
  const [swapping, setSwapping] = useState<number[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 0 && j === 0) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(0);
      setJ(0);
      setMinIndex(0);
      setComparisons(0);
      setSwaps(0);
      setComparing(null);
      setCurrentMin(null);
      setSwapping([]);
    }
  };

  const steps = comparisons + swaps;
  const isFinished = !isSorting && i >= arr.length;

  useEffect(() => {
    if (!isSorting) return;
    if (i >= arr.length) {
      setIsSorting(false);
      setComparing(null);
      setCurrentMin(null);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      const newArr = [...arr];

      if (j < arr.length) {
        // Show arrow for current comparison
        setComparing(j);

        if (j !== minIndex) {
          setComparisons((prev) => prev + 1);
        }

        if (newArr[j] < newArr[minIndex]) {
          setMinIndex(j);
          setCurrentMin(j); // update min arrow
        }

        setJ((prev) => prev + 1);
      } else {
        // Swap after inner loop finishes
        if (minIndex !== i) {
          [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
          setArr(newArr);
          setSwapping([i, minIndex]);
          setSwaps((prev) => prev + 1);

          setTimeout(() => setSwapping([]), 300);
        }

        // Move to next outer loop
        setI((prev) => prev + 1);
        setJ(i + 1);
        setMinIndex(i + 1);
        setCurrentMin(i + 1); // reset min arrow for next loop
        setComparing(null);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j, minIndex]);

  return (
    <div className="selection-sort-page">
      <h1>Selection Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n²)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
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

          {/* Bars */}
          <SortingScene
            arr={arr}
            swapping={swapping}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Current comparison arrow (light green) */}
          {comparing !== null && <Arrow index={comparing} arr={arr} color="lightgreen" />}

          {/* Current minimum arrow (orange) */}
          {currentMin !== null && <Arrow index={currentMin} arr={arr} color="orange" />}
        </Canvas>
      </div>
    </div>
  );
};

export default SelectionSort;