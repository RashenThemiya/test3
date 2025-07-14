import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState("bookings");
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await axios.delete(`/bookings/${id}`);
      setMessage("🗑️ Booking deleted successfully.");
      setTimeout(() => setMessage(""), 3000);
      fetchBookings();
    }
  };

  const handleBookingSuccess = () => {
    setMessage("✅ Thank you! We're confirming your booking. Our team will contact you within 6 hours.");
    fetchBookings();
    setTimeout(() => setMessage(""), 5000);
    setActiveView("bookings");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f4fdf4] text-gray-800">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        setEditingBooking={setEditingBooking}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:p-10 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6 text-center">
          🧼 Dashboard Panel
        </h1>

        {message && (
          <div className="mb-6 px-4 py-4 rounded-lg border border-green-400 bg-green-100 text-green-800 font-medium shadow-sm">
            {message}
          </div>
        )}

        {activeView === "create" && (
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
            <BookingForm
              fetchBookings={handleBookingSuccess}
              editingBooking={editingBooking}
              clearEdit={() => setEditingBooking(null)}
            />
          </div>
        )}

        {activeView === "bookings" && (
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
            <BookingList
              bookings={bookings}
              editBooking={(booking) => {
                setEditingBooking(booking);
                setActiveView("create");
              }}
              deleteBooking={deleteBooking}
            />
          </div>
        )}
      </main>
    </div>
  );
}
