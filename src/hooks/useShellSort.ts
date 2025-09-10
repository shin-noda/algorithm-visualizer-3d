// src/hooks/useShellSort.ts
import { useState, useEffect } from "react";
import type { Step } from "../types/Step";

// Constants for generating the random array
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

export function useShellSort() {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Counters for analysis
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  // For visualization
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);

  // Initialize array on first render
  useEffect(() => {
    resetArray();
  }, []);

  // Reset array and counters
  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * MAX_VALUE)
    );
    setArray(newArray);
    setStepHistory([]);
    setComparisons(0);
    setSwaps(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setIsFinished(false);
  };

  // Record each step (comparison or swap) for visualization and analysis
  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "swap") setSwaps((s) => s + 1);
  };

  // Shell Sort algorithm (fully step-recorded and fixed)
  const shellSort = async (arr: number[]) => {
    const n = arr.length;

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Gapped insertion sort
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;

        while (j >= gap) {
          // Record comparison before any possible swap
          setComparingIndices([j, j - gap]);
          recordStep("comparison", [j, j - gap], arr);
          await new Promise((r) => setTimeout(r, 200));

          if (arr[j - gap] > temp) {
            arr[j] = arr[j - gap];
            setSwappingIndices([j, j - gap]);
            setArray([...arr]);
            recordStep("swap", [j, j - gap], arr);
            await new Promise((r) => setTimeout(r, 200));
            j -= gap;
          } else {
            break; // Stop shifting when correct position found
          }
        }

        // Place temp in final position if it actually moved
        if (j !== i) {
          arr[j] = temp;
          setSwappingIndices([j, i]);
          setArray([...arr]);
          recordStep("swap", [j, i], arr);
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    // Clear highlights after sorting
    setComparingIndices([]);
    setSwappingIndices([]);
  };

  // Trigger sorting
  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrCopy = [...array];
    await shellSort(arrCopy);
    setArray(arrCopy);
    setIsSorting(false);
    setIsFinished(true);
  };

  return {
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
  };
}