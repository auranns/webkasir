import React, { useEffect, useState } from "react";
import "./checkout.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { FaTrash } from "react-icons/fa";
import SuccessPopup from "./popupcekout"; // Import pop-up


interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cashGiven, setCashGiven] = useState<string>("0");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProcessPayment = () => {
    if (change >= 0) {
      setIsPopupOpen(true); 
    } else {
      alert("Uang tidak cukup!");
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const change = parseFloat(cashGiven.replace(/\./g, "").replace(",", ".")) - total;
  
  const handleKeypadClick = (value: string) => {
    setCashGiven((prev) => {
      if (prev === "0") {
        return value === "." ? "0." : value; 
      }
      if (value === "C") {
        return "0"; 
      }
      if (value === "⌫") {
        return prev.length > 1 ? prev.slice(0, -1) : "0"; 
      }
      if (value === ".") {
        return prev.includes(".") ? prev : prev + value;
      }
      return prev + value;
    });
  };


  return (
    <div className="checkout-page">
      <Sidebar />
      <Navbar />
      <div className="back-button">
        <span className="back-icon">←</span> Kembali
      </div>

      <div className="main-content-wrapper">
        <div className="transaction-container">
          <div className="left-panel">
            <h2 className="payment-title">Pembayaran Tunai</h2>

            <div className="product-table">
              <div className="table-header">
                <div className="product-col">Produk</div>
                <div className="qty-col">Qty</div>
                <div className="price-col">Harga</div>
              </div>

              {cart.map((item, index) => (
                <div className="product-row" key={index}>
                  <div className="product-col">
                    <div className="product-info">
                      <img src={item.image} alt={item.name} className="product-image" />
                      <div className="product-name">{item.name}</div>
                    </div>
                  </div>
                  <div className="qty-col">{item.quantity}×</div>
                  <div className="price-col">Rp{(item.price * item.quantity).toLocaleString()}</div>
                  <div className="delete-icon" onClick={() => handleRemoveItem(item.id)}>
                    <FaTrash size={20} color="red" />
                  </div>
                </div>
              ))}
            </div>

            <div className="transaction-details">
              <div className="detail-row">
                <span>Date/Time</span>
                <span>19/02/2025 09:22</span>
              </div>
              <div className="detail-row">
                <span>Transaction Type</span>
                <span>Cash</span>
              </div>
              <div className="detail-row">
                <span>Items(4)</span>
                <span>Rp30,000</span>
              </div>
              <div className="detail-row total">
                <span>Total</span>
                <span>Rp{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="payment-info">
            <div className="amount-to-pay">
              <div className="label">Jumlah yang harus dibayar</div>
              <div className="amount">Rp{total.toLocaleString()}</div>
            </div>

            <div className="change-row">
              <div className="change-label">Kembalian</div>
              <div className="change-amount">Rp{change > 0 ? change.toLocaleString() : "0"}</div>
            </div>

            <div className="cash-input">
              <div className="input-label">Total uang yang dibayarkan</div>
              <div className="input-field">{cashGiven}</div>
            </div>

            <div className="keypad">
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick("7")} className="keypad-btn">
                  7
                </button>
                <button onClick={() => handleKeypadClick("8")} className="keypad-btn">
                  8
                </button>
                <button onClick={() => handleKeypadClick("9")} className="keypad-btn">
                  9
                </button>
                <button onClick={() => handleKeypadClick("C")} className="keypad-btn function">
                  C
                </button>
              </div>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick("4")} className="keypad-btn">
                  4
                </button>
                <button onClick={() => handleKeypadClick("5")} className="keypad-btn">
                  5
                </button>
                <button onClick={() => handleKeypadClick("6")} className="keypad-btn">
                  6
                </button>
                <button onClick={() => handleKeypadClick("⌫")} className="keypad-btn function">
                  ⌫
                </button>
              </div>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick("1")} className="keypad-btn">
                  1
                </button>
                <button onClick={() => handleKeypadClick("2")} className="keypad-btn">
                  2
                </button>
                <button onClick={() => handleKeypadClick("3")} className="keypad-btn">
                  3
                </button>
                <button onClick={() => handleKeypadClick(".")} className="keypad-btn function">
                  .
                </button>
              </div>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick("0")} className="keypad-btn">
                  0
                </button>
                <button onClick={() => handleKeypadClick("00")} className="keypad-btn">
                  00
                </button>
                <button onClick={() => handleKeypadClick("000")} className="keypad-btn">
                  000
                </button>
                <button onClick={() => handleKeypadClick("✓")} className="keypad-btn confirm">
                  ✓
                </button>
              </div>
            </div>

            <button className="process-btn" onClick={handleProcessPayment}>
              Proses
            </button>
          </div>
        </div>
      </div>
      <SuccessPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Checkout;
