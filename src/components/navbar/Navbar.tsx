import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Horizontal links for wide screens */}
      <ul className="navbar-links-horizontal">
        <li><a href="#sorting">Sorting</a></li>
        <li><a href="#searching">Searching</a></li>
        <li><a href="#dp">Dynamic Programming</a></li>
      </ul>

      {/* Fullscreen overlay menu for mobile */}
      <div className={`navbar-overlay ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul className={`overlay-links ${isOpen ? "fade-in" : ""}`}>
          <li><a href="#sorting" onClick={toggleMenu}>Sorting</a></li>
          <li><a href="#searching" onClick={toggleMenu}>Searching</a></li>
          <li><a href="#dp" onClick={toggleMenu}>Dynamic Programming</a></li>
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