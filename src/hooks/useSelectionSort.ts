// src/hooks/useSelectionSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

export function useSelectionSort() {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number | null>(null);
  const [currentMin, setCurrentMin] = useState<number | null>(null);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 0 && j === 0) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(0);
      setJ(0);
      setMinIndex(0);
      setComparisons(0);
      setSwaps(0);
      setComparing(null);
      setCurrentMin(null);
      setSwapping([]);
      setStepHistory([]);
    }
  };

  const steps = comparisons + swaps;
  const isFinished = !isSorting && i >= arr.length;

  useEffect(() => {
    if (!isSorting) return;
    if (i >= arr.length) {
      setIsSorting(false);
      setComparing(null);
      setCurrentMin(null);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      const newArr = [...arr];

      if (j < arr.length) {
        setComparing(j);

        if (j !== minIndex) {
          setComparisons((prev) => prev + 1);
          setStepHistory((prev) => [
            ...prev,
            { type: "comparison", indices: [j, minIndex], array: [...arr] },
          ]);
        }

        if (newArr[j] < newArr[minIndex]) {
          setMinIndex(j);
          setCurrentMin(j);
        }

        setJ((prev) => prev + 1);
      } else {
        if (minIndex !== i) {
          [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
          setArr(newArr);
          setSwapping([i, minIndex]);
          setSwaps((prev) => prev + 1);
          setStepHistory((prev) => [
            ...prev,
            { type: "swap", indices: [i, minIndex], array: [...newArr] },
          ]);
          setTimeout(() => setSwapping([]), 300);
        }

        setI((prev) => prev + 1);
        setJ(i + 1);
        setMinIndex(i + 1);
        setCurrentMin(i + 1);
        setComparing(null);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j, minIndex]);

  return {
    arr,
    isSorting,
    comparisons,
    swaps,
    comparing,
    currentMin,
    swapping,
    stepHistory,
    steps,
    isFinished,
    startOrRestart,
  };
}