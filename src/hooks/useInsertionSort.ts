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

  // The 'left' and 'right' parameters are for when this function is
  // used as part of another sorting algorithm like Quicksort or Mergesort.
  // We'll keep them for correctness but they'll be hardcoded to the full array.
  const insertionSort = async (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      // Update the UI with the element being held
      setInsertingIndices([i]);
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, 200));

      while (j >= left && arr[j] > key) {
        // Update the UI with the comparison
        setComparingIndices([j, i]);
        //setArray([...arr]);
        recordStep("comparison", [j, i], [...arr]);
        await new Promise((r) => setTimeout(r, 200));

        // Shift the element
        arr[j + 1] = arr[j];
        //setArray([...arr]);
        recordStep("shift", [j, j + 1], [...arr]);
        await new Promise((r) => setTimeout(r, 200));
        
        j--;
      }

      // Insert the held element
      arr[j + 1] = key;
      setInsertingIndices([j + 1]);
      setArray([...arr]);
      recordStep("insert", [j + 1], [...arr]);
      await new Promise((r) => setTimeout(r, 200));
      
      // Clear highlighting after the step is complete
      setComparingIndices([]);
      setInsertingIndices([]);
    }
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const arrCopy = [...array];
    // Pass the correct parameters for the entire array
    await insertionSort(arrCopy, 0, arrCopy.length - 1);

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