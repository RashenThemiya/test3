import { Menu, X } from "lucide-react"; // You can use Heroicons or Lucide icons
import { useState } from "react";

export default function Sidebar({ activeView, setActiveView, setEditingBooking, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (view) => {
    setActiveView(view);
    setEditingBooking(null);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-green-800 p-2 rounded-md shadow-md focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-72 bg-green-800 text-white flex flex-col justify-between p-6 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">Cleanify Pro</h2>

          <nav className="space-y-3">
            <button
              className={`w-full text-left px-5 py-3 text-lg rounded-lg transition-all duration-200 ${
                activeView === "bookings" ? "bg-green-700 font-semibold" : "hover:bg-green-600"
              }`}
              onClick={() => handleNav("bookings")}
            >
              📋 View Bookings
            </button>

            <button
              className={`w-full text-left px-5 py-3 text-lg rounded-lg transition-all duration-200 ${
                activeView === "create" ? "bg-green-700 font-semibold" : "hover:bg-green-600"
              }`}
              onClick={() => handleNav("create")}
            >
              ➕ Create Booking
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-10 px-5 py-3 text-lg text-left bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Overlay for mobile when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
