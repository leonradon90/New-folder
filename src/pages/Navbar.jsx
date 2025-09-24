import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <Link to="/">
          <img className="logo-img" src={logo} alt="logo" />
        </Link>

        {/* Animated Hamburger button */}
        <button 
          className={`hamburger ${menuOpen ? "active" : ""}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu links */}
    
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link className={`nav-link ${location.pathname === '/chatbot' ? 'active' : ''}`} to="/chatbot" onClick={() => setMenuOpen(false)}>Chatbot</Link>
          <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
       
      </div>
    </nav>
  );
}
