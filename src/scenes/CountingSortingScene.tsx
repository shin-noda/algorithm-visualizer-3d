// src/scenes/CountingSortingScene.tsx
// components
import CountingSortGrid from "../components/countingSortGrid/CountingSortGrid";

// types
import type { SortGridProps } from "../types/SortGridProps";

const CountingSortingScene = ({
  input,
  count,
  output,
  active
}:SortGridProps) => {
  return <CountingSortGrid
    input={input}
    count={count}
    output={output}
    active={active}
    bucket={[]}
  />;
};

export default CountingSortingScene;
