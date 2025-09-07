import AlgoCard from "../algoCard/AlgoCard";
import "./AlgoList.css";

const algorithms = [
  { name: "Bubble Sort", description: "A simple sorting algorithm.", route: "/bubble-sort" },
  { name: "Sliding Window", description: "Technique for subarray problems.", route: "/sliding-window" },
  { name: "Binary Search", description: "Efficient search in sorted arrays.", route: "/binary-search" },
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