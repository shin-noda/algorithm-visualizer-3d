import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;
const RUN = 32; // typical run size for TimSort

export function useTimSort() {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [comparisons, setComparisons] = useState(0);
  const [merges, setMerges] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [inserts, setInserts] = useState(0);

  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [insertingIndices, setInsertingIndices] = useState<number[]>([]);
  const [mergingIndices, setMergingIndices] = useState<number[]>([]);

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
    setShifts(0);
    setInserts(0);
    setComparingIndices([]);
    setInsertingIndices([]);
    setMergingIndices([]);
    setIsFinished(false);
  };

  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "merge") setMerges((m) => m + 1);
    if (type === "shift") setShifts((s) => s + 1);
    if (type === "insert") setInserts((i) => i + 1);
  };

  // Insertion Sort for small runs
  const insertionSort = async (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= left && arr[j] > key) {
        setComparingIndices([j, j + 1]);
        recordStep("comparison", [j, j + 1], [...arr]);
        await new Promise((r) => setTimeout(r, 200));

        arr[j + 1] = arr[j];
        recordStep("shift", [j, j + 1], [...arr]);
        j--;
      }

      arr[j + 1] = key;
      recordStep("insert", [j + 1], [...arr]);
      setInsertingIndices([j + 1]);
      setArray([...arr]);

      // clear highlight after a short delay
      await new Promise((r) => setTimeout(r, 200));
      setInsertingIndices([]);
    }
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const temp: number[] = [];
    let i = left;
    let j = mid + 1;
    const mergeIndices = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);
    setMergingIndices(mergeIndices);

    while (i <= mid && j <= right) {
      setComparingIndices([i, j]);
      recordStep("comparison", [i, j], [...arr]);
      await new Promise((r) => setTimeout(r, 150));

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = 0; k < temp.length; k++) arr[left + k] = temp[k];

    recordStep("merge", mergeIndices, [...arr]);
    setArray([...arr]);
    setComparingIndices([]);
    setMergingIndices([]);
  };

  const timSort = async (arr: number[]) => {
    const n = arr.length;

    // Step 1: Sort small runs with insertion sort
    for (let i = 0; i < n; i += RUN) {
      await insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
    }

    // Step 2: Merge runs
    let size = RUN;
    while (size < n) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = Math.min(n - 1, left + size - 1);
        const right = Math.min(left + 2 * size - 1, n - 1);

        if (mid < right) {
          await merge(arr, left, mid, right);
        }
      }
      size *= 2;
    }
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arrCopy = [...array];
    await timSort(arrCopy);

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
    shifts,
    inserts,
    comparingIndices,
    insertingIndices,
    mergingIndices,
    resetArray,
    handleSort,
  };
}