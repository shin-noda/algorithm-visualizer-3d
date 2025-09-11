// src/hooks/useRadixSort.ts
import { useState, useEffect } from "react";

// types
import type { ActiveHighlight } from "../types/Cube";

const ARRAY_SIZE = 15;
const MAX_VALUE = 999; // 0 <= n <= 999
const DIGIT_COUNT = 3; // hundreds, tens, ones

export function useRadixSort() {
  const [isSorting, setIsSorting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [tempArray, setTempArray] = useState<(number | null)[]>([]);
  const [outputArray, setOutputArray] = useState<(number | null)[]>(Array(ARRAY_SIZE).fill(null));
  const [bucketArray, setBucketArray] = useState<number[]>(Array(10).fill(0));
  const [active, setActive] = useState<ActiveHighlight[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * (MAX_VALUE + 1))
    );
    setArray(arr);
    setTempArray([...arr]);
    setBucketArray(Array(10).fill(0));
    setOutputArray(Array(ARRAY_SIZE).fill(null));
    setActive([]);
    setIsSorting(false);
    setIsFinished(false);
  };

  const getDigit = (num: number, digitIndex: 0 | 1 | 2) => {
    return Math.floor(num / Math.pow(10, digitIndex)) % 10;
  };

  const radixSort = async (arr: number[]) => {
    let temp = [...arr];

    for (let digit = 0; digit < DIGIT_COUNT; digit++) {
      const count = Array(10).fill(0);

      // Count occurrences for current digit
      for (let i = 0; i < temp.length; i++) {
        const d = getDigit(temp[i], digit as 0 | 1 | 2);
        count[d]++;
        setBucketArray([...count]);
        setActive([
          {
            row: "input",
            index: i,
            digitIndex: digit as 0 | 1 | 2,
            isMiddleCube: i === Math.floor(temp.length / 2),
          },
          { row: "bucket", index: d, digitIndex: digit as 0 | 1 | 2 },
        ]);
        await new Promise((r) => setTimeout(r, 300));
      }

      // Prefix sum
      for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
        setBucketArray([...count]);
        setActive([{ row: "bucket", index: i, digitIndex: digit as 0 | 1 | 2 }]);
        await new Promise((r) => setTimeout(r, 300));
      }

      // Build output array (stable)
      const output: (number | null)[] = Array(temp.length).fill(null);

      for (let i = temp.length - 1; i >= 0; i--) {
        const d = getDigit(temp[i], digit as 0 | 1 | 2);
        output[count[d] - 1] = temp[i];
        count[d]--;

        setTempArray([...output]); // show progress with nulls
        setBucketArray([...count]);
        setActive([{ row: "input", index: i, digitIndex: digit as 0 | 1 | 2 }]);
        await new Promise((r) => setTimeout(r, 300));
      }

      // Convert back to pure number[] (no nulls) for the next pass
      temp = output.filter((n): n is number => n !== null);

      // Update the first row so cubes reflect current sorted state
      setArray([...temp]);

      // Also update tempArray (for consistency)
      setTempArray([...temp]);

      await new Promise((r) => setTimeout(r, 400));
    }

    // Show final output in row 3
    setOutputArray([...temp]);
    setArray([...temp]); // keep first row in sync with final sorted order
    setActive([]);
    return temp;
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const sorted = await radixSort([...tempArray as number[]]);
    setOutputArray(sorted);
    setIsSorting(false);
    setIsFinished(true); // trigger display of final row
  };

  return {
    array,
    tempArray,
    bucketArray,
    outputArray,
    active,
    isSorting,
    isFinished,
    resetArray,
    handleSort,
  };
}