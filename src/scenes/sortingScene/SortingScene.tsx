// src/scenes/sortingScene/SortingScene.tsx
import type { FC } from "react";
import { Text } from "@react-three/drei";
import "./SortingScene.css";

interface SortingSceneProps {
  arr: number[];
  swapping: number[];
  maxBarHeight?: number;
  barWidth?: number;
}

const SortingScene: FC<SortingSceneProps> = ({
  arr,
  swapping,
  maxBarHeight = 5,
  barWidth = 0.8,
}) => {
  const maxVal = Math.max(...arr);

  return (
    <>
      {arr.map((value, index) => {
        const height = (value / maxVal) * maxBarHeight;

        // Always blue; red for swapping only
        const color = swapping.includes(index) ? 0xf87171 : 0x38bdf8;

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
    </>
  );
};

export default SortingScene;