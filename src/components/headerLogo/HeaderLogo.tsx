import { Link } from "react-router-dom";
import "./HeaderLogo.css";

const HeaderLogo = () => {
  return (
    <Link to="/" className="header-logo">
      Algorithm Visualizer 3D
    </Link>
  );
};

export default HeaderLogo;
