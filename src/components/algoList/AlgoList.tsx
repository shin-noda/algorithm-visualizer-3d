import AlgoCard from "../algoCard/AlgoCard";
import "./AlgoList.css";

const algorithms = [
  {
    name: "Bubble Sort",
    description: "A simple sorting algorithm.",
    route: "/bubble-sort",
  },
  {
    name: "Insertion Sort",
    description: "Builds a sorted array one element at a time.",
    route: "/insertion-sort",
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