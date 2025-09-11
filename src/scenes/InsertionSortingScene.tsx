// src/scenes/InsertionSortingScene.tsx
import type { FC } from "react";

// types
import type { SortingSceneProps } from "../types/SortingSceneProps";

// components
import Bar from "../components/bar/Bar";

const InsertionSortingScene: FC<SortingSceneProps> = ({
  arr,
  inserting = [],
  heldValue = null,      // value currently held outside array
  heldIndex = null,      // original index of held element
  maxBarHeight = 5,
  barWidth = 0.8,
}) => {
  const maxVal = Math.max(...arr, heldValue ?? 0);
  const yOffset = -4; // vertical offset for the whole scene

  return (
    <group position={[0, yOffset, 0]}>
      {/* Render array bars */}
      {arr.map((value, index) => {
        const height = (value / maxVal) * maxBarHeight;
        let color = 0x38bdf8; // default blue

        if (inserting.includes(index)) {
          color = 0xef4444; // inserting = red
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

      {/* Render held element floating above */}
      {heldValue !== null && heldIndex !== null && (
        <Bar
          key="held"
          value={heldValue}
          index={heldIndex}                  // stays at original X position
          arrLength={arr.length}
          barWidth={barWidth}
          color={0xffa500}                   // held element = orange
          height={(heldValue / maxVal) * maxBarHeight}
          isHeld={true}                      // for optional floating/bobbing effect in Bar
        />
      )}
    </group>
  );
};

export default InsertionSortingScene;