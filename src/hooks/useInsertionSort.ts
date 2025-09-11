import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

export function useInsertionSort() {
  const [array, setArray] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [inserts, setInserts] = useState(0);

  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [insertingIndices, setInsertingIndices] = useState<number[]>([]);

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
    setShifts(0);
    setInserts(0);
    setComparingIndices([]);
    setInsertingIndices([]);
    setIsFinished(false);
  };

  const recordStep = (type: Step["type"], indices: number[], arr: number[]) => {
    setStepHistory((prev) => [...prev, { type, indices, array: [...arr] }]);
    if (type === "comparison") setComparisons((c) => c + 1);
    if (type === "shift") setShifts((s) => s + 1);
    if (type === "insert") setInserts((i) => i + 1);
  };

  const insertionSort = async (arr: number[]) => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Shift elements greater than key
      while (j >= 0 && arr[j] > key) {
        // comparison with held element (-1 marks key)
        setComparingIndices([j, -1]);
        recordStep("comparison", [j, -1], [...arr]);
        await new Promise((r) => setTimeout(r, 200));

        arr[j + 1] = arr[j];
        recordStep("shift", [j, j + 1], [...arr]);
        j--;
      }

      // Insert held element at correct position if it actually moves
      if (j + 1 !== i) {
        arr[j + 1] = key;
        recordStep("insert", [j + 1], [...arr]);
        setInsertingIndices([j + 1]);
        setArray([...arr]);

        await new Promise((r) => setTimeout(r, 200));
        setInsertingIndices([]);
      }
    }
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arrCopy = [...array];
    await insertionSort(arrCopy);

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
    shifts,
    inserts,
    comparingIndices,
    insertingIndices,
    resetArray,
    handleSort,
  };
}
