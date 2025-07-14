import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ServiceDropdown({ value, onChange }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/services").then((res) => setServices(res.data));
  }, []);

  return (
    <select
      className="border rounded p-2 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Service</option>
      {services.map((service) => (
        <option key={service.id} value={service.id}>
          {service.name}
        </option>
      ))}
    </select>
  );
}
