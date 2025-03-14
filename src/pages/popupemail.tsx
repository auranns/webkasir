import React, { useState, useEffect } from "react";
import "./popupemail.css";
import { FaTimes } from "react-icons/fa"; // Import ikon X

interface VerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const VerificationPopup: React.FC<VerificationPopupProps> = ({ isOpen, onClose, onVerify }) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const correctCode = "1234"; // Simulasi kode verifikasi yang benar

  useEffect(() => {
    if (isOpen) {
      setCode(["", "", "", ""]);
      setError("");
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Cek apakah semua input sudah terisi
    if (newCode.every((digit) => digit !== "")) {
      if (newCode.join("") === correctCode) {
        onVerify();
      } else {
        setError("Kode yang Anda masukkan salah. Coba lagi.");
      }
    } else {
      setError("");
    }
  };

  return isOpen ? (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Verifikasi Email</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <p>Masukkan 4 digit kode verifikasi yang telah dikirimkan melalui email</p>
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input key={index} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(index, e.target.value)} />
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <p>
          Belum menerima kode? <span className="resend">kirim ulang ({timer})</span>
        </p>
      </div>
    </div>
  ) : null;
};

export default VerificationPopup;
