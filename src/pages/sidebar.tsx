import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logoLogin from "../assets/logo smp.png";
import "boxicons/css/boxicons.min.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={toggleSidebar}>
          <img src={logoLogin} alt="logo" />
        </div>
        {isOpen && <h2 className="sidebar-title">Koperasi</h2>}
      </div>
      <div className="sidebar-menu">
        <h3 className={`sidebar-section ${isOpen ? "full" : "small"}`}>MAIN</h3>
        <ul>
          <li className="active" onClick={() => navigate("/transaksi")}>
            <i className="bx bx-dollar"></i> {isOpen && <span>Transaksi</span>}
          </li>
          <li onClick={() => navigate("/riwayat")}>
            <i className="bx bx-history"></i> {isOpen && <span>Riwayat</span>}
          </li>
          <li onClick={() => navigate("/laporan")}>
            <i className="bx bx-file"></i> {isOpen && <span>Laporan</span>}
          </li>
        </ul>
      </div>
      <div className="sidebar-menu">
        <h3 className={`sidebar-section ${isOpen ? "full" : "small"}`}>MORE</h3>
        <ul>
          <li onClick={() => navigate("/akun")}>
            <i className="bx bx-user"></i> {isOpen && <span>Akun Saya</span>}
          </li>
          <li onClick={() => navigate("/pengaturan")}>
            <i className="bx bx-cog"></i> {isOpen && <span>Pengaturan</span>}
          </li>
          <li className="logout" onClick={() => navigate("/logout")}>
            <i className="bx bx-log-out"></i> {isOpen && <span>Keluar</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
