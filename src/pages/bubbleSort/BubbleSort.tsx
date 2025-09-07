import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";

// css
import "./BubbleSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 50;

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

const BubbleSort = () => {
  const [array] = useState(() => generateArray(ARRAY_SIZE, MAX_VALUE));
  const [arr, setArr] = useState([...array]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 0 && j === 0) {
      setIsSorting(true);
    } else if (!isSorting) {
      // Restart
      setArr([...array]);
      setI(0);
      setJ(0);
      setComparisons(0);
      setSwaps(0);
      setComparing([]);
      setSwapping([]);
    }
  };

  const steps = comparisons + swaps;
  const isFinished = !isSorting && (i >= arr.length || steps > 0);

  // Bubble sort animation
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
          if (arr[j] > arr[j + 1]) {
            setSwapping([j, j + 1]);
            const newArr = [...arr];
            [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
            setArr(newArr);
            setSwaps((prev) => prev + 1);
          } else {
            setSwapping([]);
          }
          setComparisons((prev) => prev + 1);
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

  return (
    <div className="bubble-sort-page">
      <h1>Bubble Sort</h1>

      <ComplexityTable
        timeComplexity={{ best: "O(n)", average: "O(n²)", worst: "O(n²)" }}
        spaceComplexity="O(1)"
      />

      <MiddleBar
        onClick={startOrRestart}
        steps={steps}
        comparisons={comparisons}
        swaps={swaps}
        isSorting={isSorting}
        isFinished={isFinished}
      />

      <Canvas camera={{ position: [0, 10, 20], fov: 35 }} className="bubble-sort-canvas">
        <ambientLight />
        <pointLight position={[10, 20, 10]} />
        <SortingScene
          arr={arr}
          comparing={comparing}
          swapping={swapping}
          maxBarHeight={5}
          barWidth={0.8}
        />
      </Canvas>
    </div>
  );
};

export default BubbleSort;