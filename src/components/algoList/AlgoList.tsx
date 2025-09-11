// components
import AlgoCard from "../algoCard/AlgoCard";

// data
import algorithms from "../../data/algorithms.json"

// css
import "./AlgoList.css";

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