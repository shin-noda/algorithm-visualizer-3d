// src/pages/mergeSort/MergeSort.tsx
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import MergeMiddleBar from "../../components/mergeMiddleBar/MergeMiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import StepsBoard from "../../components/stepsBoard/StepsBoard";
import Arrow from "../../components/arrow/Arrow";

// scenes
import MergeSortingScene from "../../scenes/mergeSortingScene/MergeSortingScene";

// css
import "./MergeSort.css";

// types
import type { Step } from "../../types/Step";

// ---- Constants ----
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

const MergeSort = () => {
  // ---- State variables ----
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Counters for visualization
  const [comparisons, setComparisons] = useState(0);
  const [merges, setMerges] = useState(0);

  // Highlighted bars for visualization
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [mergingIndices, setMergingIndices] = useState<number[]>([]);

  // ---- Initialize random array ----
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
    setMerges(0);
    setComparingIndices([]);
    setMergingIndices([]);
    setIsFinished(false);
  };

  // ---- Helper: record a step ----
  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "merge") setMerges((m) => m + 1);
  };

  // ---- Textbook-style recursive Merge Sort using original array indices ----
  const mergeSort = async (arr: number[], start = 0, end = arr.length - 1) => {
    if (start >= end) return; // Base case: one element

    const mid = Math.floor((start + end) / 2);

    // Recursively sort left half
    await mergeSort(arr, start, mid);

    // Recursively sort right half
    await mergeSort(arr, mid + 1, end);

    // Merge the two sorted halves
    await merge(arr, start, mid, end);
  };

  // ---- Merge two sorted subarrays ----
  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    const temp: number[] = []; // Temporary array to store merged result
    let i = start; // Pointer for left subarray (original array index)
    let j = mid + 1; // Pointer for right subarray (original array index)

    // Indices that are part of this merge (for highlighting in 3D scene)
    const mergeIndices = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
    setMergingIndices(mergeIndices);

    // ---- Merge process with comparisons ----
    while (i <= mid && j <= end) {
      setComparingIndices([i, j]); // Highlight bars being compared
      recordStep("comparison", [i, j], [...arr]); // Record comparison

      // Wait a bit for visualization
      await new Promise((r) => setTimeout(r, 200));

      // Pick the smaller element
      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    // ---- Add remaining elements from left half ----
    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }

    // ---- Add remaining elements from right half ----
    while (j <= end) {
      temp.push(arr[j]);
      j++;
    }

    // ---- Copy merged elements back to original array ----
    for (let k = 0; k < temp.length; k++) {
      arr[start + k] = temp[k];
    }

    // Record the merge step
    recordStep("merge", mergeIndices, [...arr]);

    // Update array for visualization
    setArray([...arr]);

    // Clear highlights
    setComparingIndices([]);
    setMergingIndices([]);
  };

  // ---- Handle Sort button click ----
  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arrCopy = [...array];
    await mergeSort(arrCopy);

    setArray(arrCopy);
    setIsSorting(false);
    setIsFinished(true);
  };

  // ---- Render UI ----
  return (
    <div className="main">
      <h1>Merge Sort</h1>

      <ComplexityTable
        timeComplexity={{
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
        }}
        spaceComplexity="O(n)"
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

          {/* Scene receives merging highlights */}
          <MergeSortingScene
            arr={array}
            merging={mergingIndices}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Comparison arrows (green) */}
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