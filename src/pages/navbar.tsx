import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="w-3/5 fixed top-0 left-20 bg-white pt-60 pb-8 px-100 mx-4 flex items-center justify-between z-10">
      <h2 className="text-lg font-bold">Transaksi</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-blue-50 py-3 px-4 rounded-full text-blue-600 text-xs font-medium">
          <FaCalendarAlt className="mr-2" />
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="EEEE, dd MMMM yyyy"
            className="border-none bg-transparent text-xs font-medium text-blue-600 cursor-pointer focus:outline-none"
          />
        </div>

        <span className="text-lg font-bold text-gray-700">-</span>

        <div className="flex items-center bg-blue-50 py-3 px-4 rounded-full text-blue-600 text-xs font-medium">
          <FaClock className="mr-2" />
          <span>21:21 WIB</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-10 h-10 rounded-full" />
        <span className="text-sm font-medium">Kasir</span>
        <FaChevronDown className="text-sm cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
