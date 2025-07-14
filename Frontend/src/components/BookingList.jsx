export default function BookingList({ bookings, editBooking, deleteBooking }) {
  return (
    <div className="space-y-2 mt-4">
      {bookings.map(booking => (
        <div key={booking.id} className="p-4 border rounded flex justify-between items-center">
          <div>
            <div><strong>{booking.customer_name}</strong> @ {booking.address}</div>
            <div>{new Date(booking.date_time).toLocaleString()} - Service ID: {booking.service_id}</div>
          </div>
          <div className="space-x-2">
            <button onClick={() => editBooking(booking)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => deleteBooking(booking.id)} className="bg-red-600 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
}
