import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Navbar from "./pages/Navbar";
import ChatbotComponent from "./pages/Chatbot";

export default function App() {
  return (
   
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <ChatbotComponent />
    </>


  );
}
