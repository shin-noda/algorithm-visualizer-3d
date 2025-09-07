import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";

// components
import MiddleBar from "../../components/middleBar/MiddleBar";
import ComplexityTable from "../../components/complexityTable/ComplexityTable";

// css
import "./BubbleSort.css";

// Constants
const ARRAY_SIZE = 10;
const MAX_VALUE = 50;
const MAX_BAR_HEIGHT = 5; // tallest bar height in 3D units

// Generate random array
const generateArray = (size: number, maxVal: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);

const BubbleSortScene = ({
  arr,
  comparing,
  swapping,
}: {
  arr: number[];
  comparing: number[];
  swapping: number[];
}) => {
  const maxVal = Math.max(...arr);

  return (
    <>
      {arr.map((value, index) => {
        const height = (value / maxVal) * MAX_BAR_HEIGHT;

        let color = 0x38bdf8; // default blue
        if (swapping.includes(index)) color = 0xf87171; // light red
        else if (comparing.includes(index)) color = 0x90EE90; // light green

        return (
          <group key={index} position={[index - arr.length / 2, height / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.8, height, 0.8]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={[0, height / 2 + 0.5, 0]}
              fontSize={0.5}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {value}
            </Text>
          </group>
        );
      })}
    </>
  );
};

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
        <BubbleSortScene arr={arr} comparing={comparing} swapping={swapping} />
      </Canvas>
    </div>
  );
};

export default BubbleSort;