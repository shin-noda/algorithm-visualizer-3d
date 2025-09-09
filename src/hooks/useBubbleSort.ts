// src/hooks/useBubbleSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

// constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

export function useBubbleSort() {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [stepHistory, setStepHistory] = useState<Step[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 0 && j === 0) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(0);
      setJ(0);
      setComparisons(0);
      setSwaps(0);
      setComparing([]);
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
      setComparing([]);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      if (i < arr.length) {
        if (j < arr.length - i - 1) {
          setComparing([j, j + 1]);

          setStepHistory((prev) => [
            ...prev,
            { type: "comparison", indices: [j, j + 1], array: [...arr] },
          ]);
          setComparisons((prev) => prev + 1);

          if (arr[j] > arr[j + 1]) {
            const newArr = [...arr];
            [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
            setArr(newArr);
            setSwapping([j, j + 1]);

            setStepHistory((prev) => [
              ...prev,
              { type: "swap", indices: [j, j + 1], array: [...newArr] },
            ]);
            setSwaps((prev) => prev + 1);
          } else {
            setSwapping([]);
          }

          setJ((prev) => prev + 1);
        } else {
          setJ(0);
          setI((prev) => prev + 1);
        }
      } else {
        setIsSorting(false);
        setComparing([]);
        setSwapping([]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j]);

  return {
    arr,
    isSorting,
    comparisons,
    swaps,
    comparing,
    swapping,
    stepHistory,
    steps,
    isFinished,
    startOrRestart,
  };
}