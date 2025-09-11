import type { FC } from "react";

// types
import type { SortingSceneProps } from "../types/SortingSceneProps";

// components
import Bar from "../components/bar/Bar";

const InsertionSortingScene: FC<SortingSceneProps> = ({
  arr,
  inserting = [],
  maxBarHeight = 5,
  barWidth = 0.8,
}) => {
  const maxVal = Math.max(...arr);
  const yOffset = -3;

  return (
    <group position={[0, yOffset, 0]}>
      {arr.map((value, index) => {
        const height = (value / maxVal) * maxBarHeight;

        // Default color
        let color = 0x38bdf8; // light blue

        // Inserted: bright red
        if (inserting.includes(index)) {
          color = 0xef4444;
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

export default InsertionSortingScene;