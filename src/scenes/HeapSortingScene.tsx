// src/scenes/HeapSortingScene.tsx
import type { FC } from "react";

// components
import Bar from "../components/bar/Bar";

interface HeapSortingSceneProps {
  arr: number[];
  swapping: number[]; // indices currently swapping
  maxBarHeight?: number;
  barWidth?: number;
}

const HeapSortingScene: FC<HeapSortingSceneProps> = ({
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

        // Default color: blue
        let color = 0x38bdf8;

        // Swapping: red
        if (swapping.includes(index)) {
          color = 0xf87171;
        }

        return (
          <Bar
            key={index}
            value={value}
            index={index}
            arrLength={arr.length}
            barWidth={barWidth}
            color={color}
            height={height}
          />
        );
      })}
    </group>
  );
};

export default HeapSortingScene;