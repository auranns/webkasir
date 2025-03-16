import React from "react";
import "./popupcekout.css";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <div className="popup-icon">✓</div>
        <h2>Pembayaran Berhasil!</h2>
        <p>Setiap pesanan yang selesai akan masuk ke dalam riwayat pembelian.</p>
        <button className="view-receipt-btn" onClick={onClose}>
          Lihat Struk
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
