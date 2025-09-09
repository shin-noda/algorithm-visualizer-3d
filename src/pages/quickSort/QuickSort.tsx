// src/pages/quickSort/QuickSort.tsx
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import QuickMiddleBar from "../../components/quickMiddleBar/QuickMiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import StepsBoard from "../../components/stepsBoard/StepsBoard";
import Arrow from "../../components/arrow/Arrow";

// scenes
import QuickSortingScene from "../../scenes/quickSortingScene/QuickSortingScene";

// css
import "./QuickSort.css";

// types
import type { Step } from "../../types/Step";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

const QuickSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Counters
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [pivots, setPivots] = useState(0);

  // Highlighted bars
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [pivotIndices, setPivotIndices] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * MAX_VALUE)
    );
    setArray(newArray);
    setStepHistory([]);
    setComparisons(0);
    setSwaps(0);
    setPivots(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndices([]);
    setIsFinished(false);
  };

  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "swap") setSwaps((s) => s + 1);
    if (type === "pivot") setPivots((p) => p + 1);
  };

  const quickSort = async (arr: number[], start = 0, end = arr.length - 1) => {
    if (start >= end) return;

    const pivotIndex = end;
    setPivotIndices([pivotIndex]);
    recordStep("pivot", [pivotIndex], arr);
    await new Promise((r) => setTimeout(r, 200)); // show pivot arrow

    let i = start;
    for (let j = start; j < end; j++) {
      // Show comparison (green arrow)
      setComparingIndices([j, pivotIndex]);
      recordStep("comparison", [j, pivotIndex], arr);
      await new Promise((r) => setTimeout(r, 200)); // delay for comparison

      if (arr[j] < arr[pivotIndex]) {
        // Swap bars
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep("swap", [i, j], arr);

        // Highlight swapped bars in red and update array so bars move
        setSwappingIndices([i, j]);
        setArray([...arr]);
        await new Promise((r) => setTimeout(r, 200));

        i++;
      }
    }

    // Swap pivot into final place
    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
    recordStep("swap", [i, pivotIndex], arr);
    setSwappingIndices([i, pivotIndex]);
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, 200));

    // Clear highlights
    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndices([]);

    // Recurse
    await quickSort(arr, start, i - 1);
    await new Promise((r) => setTimeout(r, 100));
    await quickSort(arr, i + 1, end);
    await new Promise((r) => setTimeout(r, 100));
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrCopy = [...array];
    await quickSort(arrCopy);
    setArray(arrCopy);
    setIsSorting(false);
    setIsFinished(true);
  };

  return (
    <div className="main">
      <h1>Quick Sort</h1>

      <ComplexityTable
        timeComplexity={{
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)"
        }}
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

          {/* Scene receives only swapping + pivots */}
          <QuickSortingScene
            arr={array}
            swapping={swappingIndices}
            pivots={pivotIndices}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Pivot arrows (yellow) */}
          {pivotIndices.map((pivotIdx) => (
            <Arrow
              key={`pivot-${pivotIdx}`}
              index={pivotIdx}
              arr={array}
              color="#facc15"
            />
          ))}

          {/* Comparison arrows (green) */}
          {comparingIndices.map((compIdx) => (
            <Arrow
              key={`comp-${compIdx}`}
              index={compIdx}
              arr={array}
              color="#4ade80"
            />
          ))}
        </Canvas>
      </div>

      <StepsBoard steps={stepHistory} />
    </div>
  );
};

export default QuickSort;