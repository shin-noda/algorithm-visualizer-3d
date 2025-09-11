// src/scenes/shellSortingScene/ShellSortingScene.tsx
import type { FC } from "react";
import { Text } from "@react-three/drei";
import "./ShellSortingScene.css";

interface ShellSortingSceneProps {
  arr: number[];
  swapping: number[];   // indices currently swapping
  comparing: number[];  // indices currently comparing
  maxBarHeight?: number;
  barWidth?: number;
}

const ShellSortingScene: FC<ShellSortingSceneProps> = ({
  arr,
  swapping,
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

export default ShellSortingScene;