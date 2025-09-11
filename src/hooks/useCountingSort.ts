// src/hooks/useCountingSort.ts
import { useState, useEffect } from "react";
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 20;

export function useCountingSort() {
  const [array, setArray] = useState<number[]>([]); // original input
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [countArray, setCountArray] = useState<number[]>([]);
  const [outputArray, setOutputArray] = useState<(number | null)[]>(Array(ARRAY_SIZE).fill(null));

  const [active, setActive] = useState<{ row: "input" | "count" | "output"; index: number } | null>(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * MAX_VALUE));
    setArray(arr);
    setStepHistory([]);
    setCountArray([]);
    setOutputArray(Array(ARRAY_SIZE).fill(null));
    setActive(null);
    setIsFinished(false);
  };

  /*
  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
  };
  */

  const countingSort = async (arr: number[]) => {
    const max = Math.max(...arr);
    const count = Array(max + 1).fill(0);

    // Counting occurrences
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
      setActive({ row: "input", index: i });
      setCountArray([...count]);
      await new Promise((r) => setTimeout(r, 200));
    }

    // Prefix sum (optional, for visualization)
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
      setActive({ row: "count", index: i });
      setCountArray([...count]);
      await new Promise((r) => setTimeout(r, 200));
    }

    const output: (number | null)[] = Array(arr.length).fill(null);

    // Build output (stable)
    for (let i = arr.length - 1; i >= 0; i--) {
      const val = arr[i];
      output[count[val] - 1] = val;
      count[val]--;
      setOutputArray([...output]);
      setActive({ row: "output", index: count[val] });
      await new Promise((r) => setTimeout(r, 200));
    }

    return output;
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const sorted = await countingSort([...array]); // use a copy
    setOutputArray(sorted); // only update output, preserve original input
    setIsSorting(false);
    setIsFinished(true);
    setActive(null);
  };

  return {
    array, // original input remains unchanged
    countArray,
    outputArray,
    stepHistory,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  };
}