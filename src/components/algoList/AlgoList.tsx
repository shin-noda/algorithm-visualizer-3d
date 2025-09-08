import AlgoCard from "../algoCard/AlgoCard";
import "./AlgoList.css";

const algorithms = [
  {
    name: "Bubble Sort",
    description: "Repeatedly swaps adjacent elements if they are in the wrong order, bubbling the largest values to the end.",
    route: "/bubble-sort",
  },
  {
    name: "Insertion Sort",
    description: "Builds a sorted array one element at a time by inserting each new element into its correct position.",
    route: "/insertion-sort",
  },
  {
    name: "Selection Sort",
    description: "Selects the smallest element from the unsorted portion and swaps it into its correct position each iteration.",
    route: "/selection-sort",
  },
];

const AlgoList = () => {
  return (
    <div className="algo-list">
      {algorithms.map((algo) => (
        <AlgoCard
          key={algo.name}
          name={algo.name}
          description={algo.description}
          route={algo.route}
        />
      ))}
    </div>
  );
};

export default AlgoList;