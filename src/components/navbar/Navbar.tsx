import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Horizontal links for wide screens */}
      <ul className="navbar-links-horizontal">
        <li>
          <Link to="/sorting">Sorting</Link>
        </li>
        <li>
          <Link to="/searching">Searching</Link>
        </li>
      </ul>

      {/* Fullscreen overlay menu for mobile */}
      <div className={`navbar-overlay ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          ×
        </button>
        <ul className={`overlay-links ${isOpen ? "fade-in" : ""}`}>
          <li>
            <Link to="/sorting" onClick={toggleMenu}>
              Sorting
            </Link>
          </li>
          <li>
            <Link to="/searching" onClick={toggleMenu}>
              Searching
            </Link>
          </li>
        </ul>
      </div>

      {/* Burger button */}
      <button className="burger" onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navbar;