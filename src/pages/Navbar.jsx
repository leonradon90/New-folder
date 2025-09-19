
import logo from "../assets/logo.png"; // adjust the path if needed

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="menu">
      <Link to="/">
        <img className="logo-img" src={logo} alt="logo" />
      </Link>
      <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
      <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
      <Link className={`nav-link ${location.pathname === '/chatbot' ? 'active' : ''}`} to="/chatbot">Chatbot</Link>
      <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
    </nav>
  );
}
                                                        