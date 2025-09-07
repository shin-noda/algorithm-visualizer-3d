import { Link } from "react-router-dom";
import "./AlgoCard.css";

interface AlgoCardProps {
  name: string;
  description: string;
  route: string;
}

const AlgoCard = ({ name, description, route }: AlgoCardProps) => {
  return (
    <Link to={route} className="algo-card">
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default AlgoCard;