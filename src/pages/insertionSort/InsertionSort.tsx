import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";
import SortingScene from "../../scenes/sortingScene/SortingScene";

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
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);

  const startOrRestart = () => {
    if (!isSorting && i === 1 && j === 1) {
      setIsSorting(true);
    } else if (!isSorting) {
      setArr([...array]);
      setI(1);
      setJ(1);
      setComparisons(0);
      setSwaps(0);
      setComparing([]);
      setSwapping([]);
    }
  };

  const steps = comparisons + swaps;
  const isFinished = !isSorting && i >= arr.length;

  // Insertion sort animation
  useEffect(() => {
    if (!isSorting) return;
    if (i >= arr.length) {
      setIsSorting(false);
      setComparing([]);
      setSwapping([]);
      return;
    }

    const interval = setInterval(() => {
      const newArr = [...arr];

      // Always show comparing arrows if inner loop runs
      if (j > 0) {
        setComparing([j, j - 1]);
        setComparisons((prev) => prev + 1);
      }

      if (j > 0 && newArr[j - 1] > newArr[j]) {
        // Swap
        [newArr[j - 1], newArr[j]] = [newArr[j], newArr[j - 1]];
        setArr(newArr);

        setSwapping([j - 1, j]);
        setSwaps((prev) => prev + 1);
        setJ((prev) => prev - 1);
      } else {
        // Move to next i
        setI((prevI) => {
          const nextI = prevI + 1;
          setJ(nextI);
          return nextI;
        });
        setComparing([]); // Clear arrows after finishing this i
        setSwapping([]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSorting, arr, i, j]);

  return (
    <div className="insertion-sort-page">
      <h1>Insertion Sort</h1>

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

      <Canvas
        camera={{ position: [0, 10, 20], fov: 35 }}
        className="insertion-sort-canvas"
      >
        <ambientLight />
        <pointLight position={[10, 20, 10]} />

        {/* Bars */}
        <SortingScene
          arr={arr}
          comparing={comparing} // Still optional if you want visual feedback in SortingScene
          swapping={swapping}
          maxBarHeight={5}
          barWidth={0.8}
        />

        {/* Down arrows above comparing bars */}
        {comparing.map((index) => {
          const maxVal = Math.max(...arr);
          const height = (arr[index] / maxVal) * 5;

          return (
            <group key={index} position={[index - arr.length / 2, height + 2, 0]}>
              {/* Shaft */}
              <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
                <meshStandardMaterial color="lightgreen" />
              </mesh>

              {/* Tip (pointing down) */}
              <mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.2, 0.3, 8]} />
                <meshStandardMaterial color="lightgreen" />
              </mesh>
            </group>
          );
        })}
      </Canvas>
    </div>
  );
};

export default InsertionSort;