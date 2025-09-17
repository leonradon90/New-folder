import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // adjust the path if needed

export default function Navbar() {
  return (
    <nav className="menu">
      <Link to="/">
        <img className="logo-img" src={logo} alt="logo" />
      </Link>
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/services">Services</Link>
      <Link className="nav-link" to="/chatbot">Chatbot</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
    </nav>
  );
}
