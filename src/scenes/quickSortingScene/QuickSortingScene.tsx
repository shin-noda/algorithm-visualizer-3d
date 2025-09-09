// src/scenes/quickSortingScene/QuickSortingScene.tsx
import type { FC } from "react";
import { Text } from "@react-three/drei";
import "./QuickSortingScene.css";

interface QuickSortingSceneProps {
  arr: number[];
  swapping: number[]; // indices currently swapping
  pivots: number[];   // indices of current pivot(s)
  maxBarHeight?: number;
  barWidth?: number;
}

const QuickSortingScene: FC<QuickSortingSceneProps> = ({
  arr,
  swapping,
  pivots,
  maxBarHeight = 5,
  barWidth = 0.8,
}) => {
  const maxVal = Math.max(...arr);
  const yOffset = -4;

  return (
    <group position={[0, yOffset, 0]}>
      {arr.map((value, index) => {
        const height = (value / maxVal) * maxBarHeight;

        // Default: blue
        let color = 0x38bdf8;

        // Swapping: red
        if (swapping.includes(index)) {
          color = 0xf87171;
        }
        // Pivot: yellow (arrows show pivot, but bars stay highlighted too)
        else if (pivots.includes(index)) {
          color = 0xfacc15;
        }

        return (
          <group key={index} position={[index - arr.length / 2, height / 2, 0]}>
            <mesh>
              <boxGeometry args={[barWidth, height, barWidth]} />
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
    </group>
  );
};

export default QuickSortingScene;