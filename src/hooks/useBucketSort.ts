// src/hooks/useBucketSort.ts
import { useState, useEffect } from "react";

// types
import type { ActiveHighlight } from "../types/Cube";

const ARRAY_SIZE = 15;
const MAX_VALUE = 100;
const BUCKET_COUNT = 10;

export function useBucketSort() {
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [outputArray, setOutputArray] = useState<(number | null)[]>(Array(ARRAY_SIZE).fill(null));
  const [bucketArray, setBucketArray] = useState<number[]>(Array(BUCKET_COUNT).fill(0));
  const [active, setActive] = useState<ActiveHighlight[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * (MAX_VALUE + 1))
    );
    setArray(arr);
    setBucketArray(Array(BUCKET_COUNT).fill(0));
    setOutputArray(Array(ARRAY_SIZE).fill(null));
    setActive([]);
    setIsSorting(false);
    setIsFinished(false);
  };

  const bucketSort = async (arr: number[]) => {
    // Step 1: create buckets
    const buckets: number[][] = Array.from({ length: BUCKET_COUNT }, () => []);

    // Step 2: distribute input into buckets
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      const bucketIndex = Math.floor((value / (MAX_VALUE + 1)) * BUCKET_COUNT);
      buckets[bucketIndex].push(value);

      // Update bucket counts for visualization
      const counts = buckets.map((b) => b.length);
      setBucketArray([...counts]);
      setActive([
        { row: "input", index: i },
        { row: "bucket", index: bucketIndex },
      ]);
      await new Promise((r) => setTimeout(r, 300));
    }

    // Step 3: sort each bucket (using insertion sort for stability)
    for (let b = 0; b < BUCKET_COUNT; b++) {
      for (let i = 1; i < buckets[b].length; i++) {
        const key = buckets[b][i];
        let j = i - 1;
        while (j >= 0 && buckets[b][j] > key) {
          buckets[b][j + 1] = buckets[b][j];
          j--;
        }
        buckets[b][j + 1] = key;

        setActive([{ row: "bucket", index: b }]);
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    // Step 4: concatenate buckets into final output
    const output: number[] = [];
    for (let b = 0; b < BUCKET_COUNT; b++) {
      for (const val of buckets[b]) {
        output.push(val);
        setOutputArray([...output, ...Array(ARRAY_SIZE - output.length).fill(null)]);
        setActive([{ row: "output", index: output.length - 1 }]);
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    return output;
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const sorted = await bucketSort([...array]);
    setOutputArray(sorted);
    setArray(sorted); // keep top row in sync
    setIsSorting(false);
    setIsFinished(true);
    setActive([]);
  };

  return {
    array,
    bucketArray,
    outputArray,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  };
}