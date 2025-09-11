// src/hooks/useCountingSort.ts
import { useState, useEffect } from "react";
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 20;

type RowKind = "input" | "count" | "output";
type ActiveHighlight = {
  row: RowKind;
  index: number;
  sourceRow?: RowKind; // optional, indicates why it's highlighted
};


export function useCountingSort() {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [countArray, setCountArray] = useState<number[]>([]);
  const [outputArray, setOutputArray] = useState<(number | null)[]>(
    Array(ARRAY_SIZE).fill(null)
  );

  const [active, setActive] = useState<ActiveHighlight[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * MAX_VALUE)
    );
    setArray(arr);
    setStepHistory([]);
    setCountArray([]);
    setOutputArray(Array(ARRAY_SIZE).fill(null));
    setActive([]);
    setIsFinished(false);
  };

  const countingSort = async (arr: number[]) => {
    const max = Math.max(...arr);
    const count = Array(max + 1).fill(0);

    // Counting occurrences
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
      setActive([
        { row: "input", index: i },
        { row: "count", index: arr[i], sourceRow: "input" },
      ]);
      setCountArray([...count]);
      await new Promise((r) => setTimeout(r, 300));
    }

    // Prefix sum
    for (let i = 0; i < count.length; i++) {
      if (i > 0) count[i] += count[i - 1];
      setActive([{ row: "count", index: i }]); // red, no sourceRow
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
      setActive([{ row: "output", index: count[val] }]);
      await new Promise((r) => setTimeout(r, 200));
    }

    return output;
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const sorted = await countingSort([...array]);
    setOutputArray(sorted);
    setIsSorting(false);
    setIsFinished(true);
    setActive([]);
  };

  return {
    array,
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