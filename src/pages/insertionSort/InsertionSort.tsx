// src/pages/insertionSort/InsertionSort.tsx
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";
import InsertionMiddleBar from "../../components/insertionMiddleBar/InsertionMiddleBar";

// css
import "./InsertionSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 100;

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

// Arrow component to show current comparison
const Arrow = ({
  index,
  arr,
  color,
}: {
  index: number;
  arr: number[];
  color: string;
}) => {
  const maxVal = Math.max(...arr);
  const height = (arr[index] / maxVal) * 5;

  return (
    <group position={[index - arr.length / 2, height + 2, 0]}>
      {/* Shaft */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Tip */}
      <mesh position={[0, -4.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const InsertionSort = () => {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(1);
  const [key, setKey] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [moves, setMoves] = useState(0);

  const [comparing, setComparing] = useState<number | null>(null);
  const [swapping, setSwapping] = useState<number[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 1 && j === 1) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(1);
      setJ(1);
      setKey(null);
      setComparisons(0);
      setMoves(0);
      setComparing(null);
      setSwapping([]);
    }
  };

  const steps = comparisons + moves;
  const isFinished = !isSorting && i >= arr.length;

  useEffect(() => {
    if (!isSorting) return;
    if (i >= arr.length) {
      setIsSorting(false);
      setComparing(null);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      const newArr = [...arr];

      if (key === null) {
        // Pick the next key
        setKey(newArr[i]);
        setJ(i - 1);
        setComparing(i);
      } else if (j >= 0 && newArr[j] > key) {
        // Shift elements to the right
        newArr[j + 1] = newArr[j];
        setArr(newArr);
        setSwapping([j, j + 1]);
        setMoves((prev) => prev + 1);
        setComparisons((prev) => prev + 1); // This is the correct place to count a comparison
        setComparing(j);

        // Clear swapping highlight after 300ms
        setTimeout(() => setSwapping([]), 300);

        // Decrement j only if shift happened
        setJ((prev) => prev - 1);
      } else {
        // Insert the key in the correct position and count the final comparison
        newArr[j + 1] = key!;
        setArr(newArr);
        setKey(null);
        setI((prev) => prev + 1);
        setComparing(null);
        // This is the additional comparison for when the element is not greater than the key or the start of the array is reached.
        // It should only be counted if j was not already -1.
        if (j >= 0) {
           setComparisons((prev) => prev + 1);
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j, key]);

  return (
    <div className="insertion-sort-page">
      <h1>Insertion Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
      />

      <InsertionMiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        moves={moves}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <div className="insertion-sort-canvas">
        <Canvas camera={{ position: [0, 10, 20], fov: 20 }}>
          <ambientLight />
          <pointLight position={[10, 20, 10]} />

          {/* Bars */}
          <SortingScene
            arr={arr}
            swapping={swapping}
            maxBarHeight={5}
            barWidth={0.8}
          />

          {/* Current comparison arrow */}
          {comparing !== null && <Arrow index={comparing} arr={arr} color="lightgreen" />}
        </Canvas>
      </div>
    </div>
  );
};

export default InsertionSort;