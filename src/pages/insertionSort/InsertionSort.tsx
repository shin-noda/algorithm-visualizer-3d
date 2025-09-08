import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import InsertionMiddleBar from "../../components/insertionMiddleBar/InsertionMiddleBar";
import Arrow from "../../components/arrow/Arrow";
import StepsBoard from "../../components/stepsBoard/StepsBoard";

// css
import "./InsertionSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

const InsertionSort = () => {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(1);
  const [key, setKey] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  // --- CHANGES START HERE ---
  // Replace single 'moves' state with separate 'shifts' and 'inserts' states
  const [shifts, setShifts] = useState(0);
  const [inserts, setInserts] = useState(0);
  // --- CHANGES END HERE ---

  const [comparing, setComparing] = useState<number | null>(null);
  const [shifting, setShifting] = useState<number[]>([]);

  // Steps history for StepsBoard
  const [stepsHistory, setStepsHistory] = useState<
    { type: "comparison" | "shift" | "insert"; indices: number[]; array: number[] }[]
  >([]);

  const startOrRestart = () => {
    if (!isSorting && i === 1 && j === 1) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(1);
      setJ(1);
      setKey(null);
      setComparisons(0);
      // --- CHANGES START HERE ---
      // Reset new states on restart
      setShifts(0);
      setInserts(0);
      // --- CHANGES END HERE ---
      setComparing(null);
      setShifting([]);
      setStepsHistory([]);
    }
  };

  // --- CHANGES START HERE ---
  // Calculate total steps from all three operations
  const steps = comparisons + shifts + inserts;
  // --- CHANGES END HERE ---
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
        // Step 1: Pick the next key to insert
        setKey(currentArr[i]);
        setJ(i - 1);
        setComparing(i);
        return;
      }

      if (j >= 0) {
        // Step 2: Perform a comparison
        setComparisons((prev) => prev + 1);
        setComparing(j);

        // Record the comparison step
        setStepsHistory((prev) => [
          ...prev,
          { type: "comparison", indices: [j, j + 1], array: [...currentArr] },
        ]);

        if (currentArr[j] > key) {
          // Step 3: Shift the element
          currentArr[j + 1] = currentArr[j];
          setArr(currentArr);
          setShifting([j, j + 1]);
          // --- CHANGES START HERE ---
          // Increment the shifts counter
          setShifts((prev) => prev + 1);
          // --- CHANGES END HERE ---

          // Record the shift step
          setStepsHistory((prev) => [
            ...prev,
            { type: "shift", indices: [j, j + 1], array: [...currentArr] },
          ]);

          setJ((prev) => prev - 1);
        } else {
          // Step 4: Insert the key and move to the next unsorted element
          currentArr[j + 1] = key;
          setArr(currentArr);
          setKey(null);
          setI((prev) => prev + 1);
          setComparing(null);
          // --- CHANGES START HERE ---
          // Increment the inserts counter
          setInserts((prev) => prev + 1);
          // --- CHANGES END HERE ---

          // Record the insertion step
          setStepsHistory((prev) => [
            ...prev,
            { type: "insert", indices: [j + 1], array: [...currentArr] },
          ]);
        }
      } else {
        // Step 5: Insert the key at the beginning (index 0)
        currentArr[0] = key;
        setArr(currentArr);
        setKey(null);
        setI((prev) => prev + 1);
        setComparing(null);
        // --- CHANGES START HERE ---
        // Increment the inserts counter
        setInserts((prev) => prev + 1);
        // --- CHANGES END HERE ---

        // Record the insertion step
        setStepsHistory((prev) => [
          ...prev,
          { type: "insert", indices: [0], array: [...currentArr] },
        ]);
      }
    };

    const timer = setTimeout(sortStep, 300);
    return () => clearTimeout(timer);
  }, [isSorting, arr, i, j, key]);

  return (
    <div className="main">
      <h1>Insertion Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
      />

      <InsertionMiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        // --- CHANGES START HERE ---
        // Pass the new shifts and inserts props
        shifts={shifts}
        inserts={inserts}
        // --- CHANGES END HERE ---
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="insertion-sort-canvas">
        <Canvas camera={{ position: [0, 5, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          {/* Bars */}
          <SortingScene
            arr={arr}
            swapping={shifting} // Renamed for clarity, passing shifting state
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Current comparison arrow */}
          {comparing !== null && (
            <Arrow index={comparing} arr={arr} color="lightgreen" />
          )}
        </Canvas>
      </div>

      {/* StepsBoard below canvas */}
      <StepsBoard steps={stepsHistory} />
    </div>
  );
};

export default InsertionSort;