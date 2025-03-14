import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./transaksi.css";
import productImage from "../assets/tictac.jpeg";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface QuantityMap {
  [key: number]: number;
}

const Transaksi: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<QuantityMap>({});

  const addToCart = (product: Product): void => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setQuantities({
      ...quantities,
      [product.id]: (quantities[product.id] || 0) + 1,
    });
  };

  const removeFromCart = (product: Product): void => {
    if (quantities[product.id] > 1) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)));
      setQuantities({
        ...quantities,
        [product.id]: quantities[product.id] - 1,
      });
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
      const newQuantities = { ...quantities };
      delete newQuantities[product.id];
      setQuantities(newQuantities);
    }
  };

  const deleteFromCart = (productId: number): void => {
    setCart(cart.filter((item) => item.id !== productId));
    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
  };

  const products: Product[] = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Tic Tac Pilus Sapi Panggang",
      price: 7500,
      image: productImage,
    }));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="transaksi-container">
      <Sidebar />
      <Navbar />
      <div className="transaksi-content">
        <div className="kategori">
          <button className="active">
            <i className="bx bx-category"></i>
            <span>Semua Menu</span>
            <small>100 item</small>
          </button>
          {[...Array(4)].map((_, index) => (
            <button key={index}>
              <i className="bx bx-dish"></i>
              <span>Title</span>
            </button>
          ))}
        </div>

        <div className="search-section">
          <button className="scan-icon">
            <i className="bx bx-barcode"></i>
          </button>

          <div className="barcode-input">
            <input type="text" placeholder="Masukkan kode barcode..." />
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Cari barang atau kode produk..." />
            <button className="search-button">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </div>

        <div className="produk-container">
          {products.map((product) => (
            <div key={product.id} className={`produk-card ${quantities[product.id] ? "selected" : ""}`} onClick={() => (quantities[product.id] ? null : addToCart(product))}>
              <img src={product.image} alt={product.name} />
              <p className="produk-title">{product.name}</p>
              <p className="produk-harga">Rp{product.price.toLocaleString()}</p>

              {quantities[product.id] ? (
                <div className="quantity-controls">
                  <button
                    className="minus-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(product);
                    }}
                  >
                    -
                  </button>
                  <span className="quantity">{quantities[product.id]}</span>
                  <button
                    className="plus-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    +
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="daftar-pesanan">
        <h2>Daftar Pesanan</h2>
        {cart.length === 0 ? (
          <p className="empty-order">tidak ada pilihan item</p>
        ) : (
          <div className="order-items">
            <div className="order-header">
              <span className="produk">Produk</span>
              <span className="qty">Qty</span>
              <span className="harga">Harga</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-quantity">{item.quantity}x</span>
                <div className="item-price">
                  <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                  <button className="remove-btn" onClick={() => deleteFromCart(item.id)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="summary">
          <div className="summary-row">
            <span>Items({totalItems})</span>
            <span>Rp{total.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rp{total.toLocaleString()}</span>
          </div>
        </div>

        <h3>Metode Pembayaran</h3>
        <div className="metode-pembayaran">
          <button className={cart.length > 0 ? "active" : "disabled"}>
            <i className="bx bx-money"></i> Tunai
          </button>
          <button className={cart.length > 0 ? "active" : "disabled"}>
            <i className="bx bx-qr"></i> Qris
          </button>
        </div>

        <button className={`checkout-btn ${cart.length > 0 ? "active" : "disabled"}`}>Rp{total.toLocaleString()}</button>

        {cart.length > 0 && (
          <button className="batal-btn">
            <i className="bx bx-x"></i> Batal Pilih ({totalItems})
          </button>
        )}
      </div>
    </div>
  );
};

export default Transaksi;
