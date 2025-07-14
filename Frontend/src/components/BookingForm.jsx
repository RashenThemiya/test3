import { useEffect, useState } from "react";
import axios from "../api/axios";
import ServiceDropdown from "./ServiceDropdown";

export default function BookingForm({ fetchBookings, editingBooking, clearEdit }) {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    if (editingBooking) {
      setCustomerName(editingBooking.customer_name);
      setAddress(editingBooking.address);
      setDateTime(editingBooking.date_time.slice(0, 16));
      setServiceId(editingBooking.service_id);
    }
  }, [editingBooking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !address || !dateTime || !serviceId) {
      alert("All fields are required!");
      return;
    }
    try {
      if (editingBooking) {
        await axios.put(`/bookings/${editingBooking.id}`, {
          customer_name: customerName,
          address,
          date_time: dateTime,
          service_id: serviceId,
        });
        clearEdit();
      } else {
        await axios.post("/bookings", {
          customer_name: customerName,
          address,
          date_time: dateTime,
          service_id: serviceId,
        });
      }
      setCustomerName(""); setAddress(""); setDateTime(""); setServiceId("");
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to save booking.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
      <input
        type="text" placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="text" placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <ServiceDropdown value={serviceId} onChange={setServiceId} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {editingBooking ? "Update Booking" : "Book Service"}
      </button>
    </form>
  );
}
