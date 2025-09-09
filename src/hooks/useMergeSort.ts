// src/hooks/useMergeSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

export function useMergeSort() {
  // State
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Counters
  const [comparisons, setComparisons] = useState(0);
  const [merges, setMerges] = useState(0);

  // Highlighted bars
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [mergingIndices, setMergingIndices] = useState<number[]>([]);

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
    setMerges(0);
    setComparingIndices([]);
    setMergingIndices([]);
    setIsFinished(false);
  };

  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "merge") setMerges((m) => m + 1);
  };

  // MergeSort Algorithm
  const mergeSort = async (arr: number[], start = 0, end = arr.length - 1) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    const temp: number[] = [];
    let i = start;
    let j = mid + 1;

    const mergeIndices = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
    setMergingIndices(mergeIndices);

    while (i <= mid && j <= end) {
      setComparingIndices([i, j]);
      recordStep("comparison", [i, j], [...arr]);
      await new Promise((r) => setTimeout(r, 200));

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }

    while (j <= end) {
      temp.push(arr[j]);
      j++;
    }

    for (let k = 0; k < temp.length; k++) {
      arr[start + k] = temp[k];
    }

    recordStep("merge", mergeIndices, [...arr]);
    setArray([...arr]);

    setComparingIndices([]);
    setMergingIndices([]);
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arrCopy = [...array];
    await mergeSort(arrCopy);

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
    merges,
    comparingIndices,
    mergingIndices,
    resetArray,
    handleSort,
  };
}