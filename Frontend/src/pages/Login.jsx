import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("/auth/login", { username, password });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        await axios.post("/auth/register", { username, password });
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border rounded p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded w-full transition-all duration-200"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 hover:underline font-medium"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </form>
    </div>
  );
}
