import { useState } from "react";
import "./navbar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const Navbar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="navbar">
      <h2 className="navbar-title">Transaksi</h2>
      <div className="date-time">
        <div className="date">
          <FaCalendarAlt className="icon" />
          <DatePicker selected={selectedDate} onChange={(date: Date | null) => setSelectedDate(date)} dateFormat="EEEE, dd MMMM yyyy" className="datepicker" />
        </div>
        <span className="separator">-</span>
        <div className="time">
          <FaClock className="icon" />
          <span>21:21 WIB</span>
        </div>
      </div>
      <div className="user-profile">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
        <span>Kasir ▼</span>
      </div>
    </div>
  );
};

export default Navbar;
