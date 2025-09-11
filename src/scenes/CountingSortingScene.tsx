// src/scenes/CountingSortingScene.tsx
// components
import CountingSortGrid from "../components/countingSortGrid/CountingSortGrid";

interface CountingSortingSceneProps {
  input: number[];
  count: number[];
  output: (number | null)[];
  active?: { row: "input" | "count" | "output"; index: number }[];
  showLabels?: boolean;
}

const CountingSortingScene = ({
  input,
  count,
  output,
  active
}:CountingSortingSceneProps) => {
  return <CountingSortGrid input={input} count={count} output={output} active={active} />;
};

export default CountingSortingScene;
