// src/scenes/ShellSortingScene.tsx
import type { FC } from "react";

// components
import Bar from "../components/bar/Bar";

// types
import type { SortingSceneProps } from "../types/SortingSceneProps";

const ShellSortingScene: FC<SortingSceneProps> = ({
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
        if (swapping?.includes(index)) {
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

export default ShellSortingScene;