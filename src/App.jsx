import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Navbar from "./pages/Navbar";
import Chatbot from "./pages/Chatbot";       // floating widget
import ChatbotPage from "./pages/ChatbotPage"; // fullscreen page

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/chatbot" element={<ChatbotPage />} /> {/* Fullscreen chatbot page */}
      </Routes>
      <Chatbot /> {/* Floating widget is always available */}
    </>
  );
}
