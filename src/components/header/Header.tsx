// components
import HeaderLogo from "../headerLogo/HeaderLogo";
import Navbar from "../navbar/Navbar";

// CSS
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <HeaderLogo />

      <Navbar />

    </header>
  );
};

export default Header;