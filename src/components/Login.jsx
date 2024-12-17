import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // For logging in
import { useNavigate } from "react-router-dom"; // For navigation
import { auth } from "../firebaseConfig"; // Firebase Auth instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors before login attempt
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upon successful login, redirect based on roles or user-specific logic
      // Fetch the user's role or proceed to desired page
      navigate("/admin"); // Example redirect to Admin Dashboard
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Error logging in:", err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: "10px 0", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: "10px 0", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
