import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const dummyUsers = [
  { email: "node@example.com", password: "123456", role: "node" },
  { email: "owner@example.com", password: "123456", role: "owner" },
  { email: "admin@example.com", password: "admin123", role: "admin" }
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = dummyUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("userRole", user.role);
      alert(`Login successful as ${user.role}!`);

      if (user.role === "node") {
        navigate("/user");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    } else {
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Login</button>
      </form>

      {/* Signup Link */}
      <p className="signup-link">
        New to us? <span onClick={() => navigate("/signup")}>Signup</span>
      </p>
    </div>
  );
}

export default Login;
