import React, { useState } from "react";
import "./login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon mata
import iconLogin from "../assets/iconlogin.png";
import logoLogin from "../assets/logo smp.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State untuk toggle password

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    alert("Login berhasil! (Simulasi)");
  };

  return (
    <div className="login-container">
      <div className="login-img">
        <img src={iconLogin} alt="Illustration" />
      </div>
      <div className="login-form">
        <div className="logo">
          <img src={logoLogin} alt="Illustration" />
        </div>
        <h2>Masuk ke Akun Anda</h2>
        <p>Kamu dapat masuk sebagai owner ataupun staf</p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Kata Sandi</label>
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="forgot-password">
            <a href="#">Lupa Password?</a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="register-link">
            Belum punya akun? <a href="#">Daftar</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
