// src/hooks/useHeapSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

export function useHeapSort() {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);

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
    setComparingIndices([]);
    setSwappingIndices([]);
    setIsFinished(false);
  };

  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "swap") setSwaps((s) => s + 1);
  };

  // Heapify helper
  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setComparingIndices([i, left]);
      recordStep("comparison", [i, left], arr);
      await new Promise((r) => setTimeout(r, 200));
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setComparingIndices([largest, right]);
      recordStep("comparison", [largest, right], arr);
      await new Promise((r) => setTimeout(r, 200));
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      recordStep("swap", [i, largest], arr);
      setSwappingIndices([i, largest]);
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, 200));
      await heapify(arr, n, largest);
    }
  };

  // Heap Sort algorithm
  const heapSort = async (arr: number[]) => {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      recordStep("swap", [0, i], arr);
      setSwappingIndices([0, i]);
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, 200));

      await heapify(arr, i, 0);
    }

    setComparingIndices([]);
    setSwappingIndices([]);
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrCopy = [...array];
    await heapSort(arrCopy);
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