import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SidebarPage from "./pages/sidebar";
import TransaksiPage from "./pages/transaksi";
import NavbarPage from "./pages/navbar";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sidebar" element={<SidebarPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/navbar" element={<NavbarPage />} />
        <Route path="*" element={<LoginPage />} /> {/* Default ke Login */}
      </Routes>
    </Router>
  );
}

export default App;
