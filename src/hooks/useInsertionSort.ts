// src/hooks/useInsertionSort.ts
import { useState, useEffect } from "react";

// types
import type { Step } from "../types/Step";

// constans
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

export function useInsertionSort() {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(1);
  const [key, setKey] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [inserts, setInserts] = useState(0);

  const [comparing, setComparing] = useState<number | null>(null);
  const [shifting, setShifting] = useState<number[]>([]);
  const [stepsHistory, setStepsHistory] = useState<Step[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 1 && j === 1) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(1);
      setJ(1);
      setKey(null);
      setComparisons(0);
      setShifts(0);
      setInserts(0);
      setComparing(null);
      setShifting([]);
      setStepsHistory([]);
    }
  };

  const steps = comparisons + shifts + inserts;
  const isFinished = !isSorting && i >= arr.length;

  useEffect(() => {
    if (!isSorting || i >= arr.length) {
      setIsSorting(false);
      setComparing(null);
      setShifting([]);
      return;
    }

    const sortStep = () => {
      const currentArr = [...arr];

      if (key === null) {
        setKey(currentArr[i]);
        setJ(i - 1);
        setComparing(i);
        return;
      }

      if (j >= 0) {
        setComparisons((prev) => prev + 1);
        setComparing(j);

        setStepsHistory((prev) => [
          ...prev,
          { type: "comparison", indices: [j, j + 1], array: [...currentArr] },
        ]);

        if (currentArr[j] > key) {
          currentArr[j + 1] = currentArr[j];
          setArr(currentArr);
          setShifting([j, j + 1]);
          setShifts((prev) => prev + 1);

          setStepsHistory((prev) => [
            ...prev,
            { type: "shift", indices: [j, j + 1], array: [...currentArr] },
          ]);

          setJ((prev) => prev - 1);
        } else {
          currentArr[j + 1] = key;
          setArr(currentArr);
          setKey(null);
          setI((prev) => prev + 1);
          setComparing(null);
          setInserts((prev) => prev + 1);

          setStepsHistory((prev) => [
            ...prev,
            { type: "insert", indices: [j + 1], array: [...currentArr] },
          ]);
        }
      } else {
        currentArr[0] = key!;
        setArr(currentArr);
        setKey(null);
        setI((prev) => prev + 1);
        setComparing(null);
        setInserts((prev) => prev + 1);

        setStepsHistory((prev) => [
          ...prev,
          { type: "insert", indices: [0], array: [...currentArr] },
        ]);
      }
    };

    const timer = setTimeout(sortStep, 300);
    return () => clearTimeout(timer);
  }, [isSorting, arr, i, j, key]);

  return {
    arr,
    isSorting,
    comparisons,
    shifts,
    inserts,
    comparing,
    shifting,
    stepsHistory,
    steps,
    isFinished,
    startOrRestart,
  };
}