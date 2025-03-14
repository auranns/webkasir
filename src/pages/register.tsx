import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import iconLogin from "../assets/iconlogin.png";
import logoLogin from "../assets/logo smp.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VerificationPopup from "./popupemail"; // Import popup

const Register = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // State untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State untuk menampilkan popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle submit form
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Anda harus menyetujui ketentuan layanan!");
      return;
    }

    console.log("Data Register:", formData);

    // Buka popup setelah registrasi berhasil
    setIsPopupOpen(true);
  };

  // Handle verifikasi dari popup
  const handleVerify = () => {
    setIsPopupOpen(false);
    alert("Verifikasi berhasil!");
    navigate("/login"); 
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="logo-register">
          <img src={logoLogin} alt="Illustration" />
        </div>
        <h1>Masuk ke Akun Anda</h1>
        <p>Selamat datang! Silahkan masukkan informasi Anda</p>
        <div className="register-image">
          <img src={iconLogin} alt="Illustration" />
        </div>
      </div>

      <div className="register-right">
        <form className="register-form" onSubmit={handleRegister}>
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <label>Nomor Telephone</label>
          <input type="text" name="phone" placeholder="Nomor Telephone" value={formData.phone} onChange={handleChange} required />

          <label>Kata Sandi</label>
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Kata Sandi" value={formData.password} onChange={handleChange} required />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Konfirmasi Password */}
          <label>Konfirmasi Kata Sandi</label>
          <div className="password-container">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Konfirmasi Kata Sandi" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="terms">
            <input type="checkbox" name="termsAccepted" id="terms" checked={formData.termsAccepted} onChange={handleChange} required />
            <label htmlFor="terms">
              Dengan mendaftar, saya menyatakan telah membaca dan menyetujui <a href="#">Ketentuan Layanan & Kebijakan Website Koperasi</a>
            </label>
          </div>

          <button type="submit" className="register-button">
            Daftar
          </button>
        </form>

        <p className="login-link">
          Sudah punya akun? <a href="#">Masuk</a>
        </p>
      </div>

      {/* Popup Verifikasi */}
      <VerificationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onVerify={handleVerify} />
    </div>
  );
};

export default Register;
