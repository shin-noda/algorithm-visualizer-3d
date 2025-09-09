// src/hooks/useQuickSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

export function useQuickSort() {
  // States
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

  // Initialize array
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

  // QuickSort Algorithm
  const quickSort = async (arr: number[], start = 0, end = arr.length - 1) => {
    if (start >= end) return;

    const pivotIndex = end;
    setPivotIndices([pivotIndex]);
    recordStep("pivot", [pivotIndex], arr);
    await new Promise((r) => setTimeout(r, 200));

    let i = start;
    for (let j = start; j < end; j++) {
      setComparingIndices([j, pivotIndex]);
      recordStep("comparison", [j, pivotIndex], arr);
      await new Promise((r) => setTimeout(r, 200));

      if (arr[j] < arr[pivotIndex]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep("swap", [i, j], arr);
        setSwappingIndices([i, j]);
        setArray([...arr]);
        await new Promise((r) => setTimeout(r, 200));
        i++;
      }
    }

    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
    recordStep("swap", [i, pivotIndex], arr);
    setSwappingIndices([i, pivotIndex]);
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, 200));

    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndices([]);

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

  return {
    array,
    stepHistory,
    isSorting,
    isFinished,
    comparisons,
    swaps,
    pivots,
    comparingIndices,
    swappingIndices,
    pivotIndices,
    resetArray,
    handleSort,
  };
}