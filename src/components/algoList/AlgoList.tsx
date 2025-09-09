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
  {
    name: "Quick Sort",
    description:
      "Divides the array using a pivot, then recursively sorts the partitions. Efficient for large datasets with average O(n log n) time complexity.",
    route: "/quick-sort",
  },
  {
    name: "Merge Sort",
    description:
      "Divides the array into halves recursively, then merges the sorted halves back together. Guarantees O(n log n) time complexity and is stable.",
    route: "/merge-sort",
  },
  {
    name: "Heap Sort",
    description:
      "Builds a max heap from the array, then repeatedly extracts the largest element to sort the array. Efficient O(n log n) time complexity but unstable.",
    route: "/heap-sort",
  }
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