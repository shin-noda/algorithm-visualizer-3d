// src/scenes/SortingScene.tsx
import type { FC } from "react";

// components
import Bar from "../components/bar/Bar";

// types
import type { SortingSceneProps } from "../types/SortingSceneProps";

const SortingScene: FC<SortingSceneProps> = ({
  arr,
  swapping,
  maxBarHeight = 5,
  barWidth = 0.8,
}) => {
  const maxVal = Math.max(...arr);

  // Optional: offset all bars down by 1 or 2 units
  const yOffset = -4;

  return (
    <group position={[0, yOffset, 0]}>
      {arr.map((value, index) => {
        const height = (value / maxVal) * maxBarHeight;

        // Always blue; red for swapping only
        const color = swapping?.includes(index) ? 0xf87171 : 0x38bdf8;

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


export default SortingScene;