import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/helpers";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[Login] Attempting login for:", email);
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("[Login] Checking against", users.length, "registered users");
      
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        console.log("[Login] No matching user found for:", email);
        console.log("[Login] Registered emails:", users.map(u => u.email));
        setError("This email is not registered. Please create an account first by clicking 'Sign Up Here' below.");
        return;
      }

      console.log("[Login] User found, logging in:", user.email);
      // Login successful
      login(user);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("[Login] Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🏥</div>
          <h1>MediCare Portal</h1>
          <p>Your Health, Our Priority</p>
        </div>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button className="auth-tab active" disabled>
            Login
          </button>
          <Link to="/signup" className="auth-tab">
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="required">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              aria-label="Email address"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="required">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              aria-label="Password"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login to Portal"}
          </button>
        </form>

        <div className="login-divider">Demo Test Account</div>

        <div className="demo-credentials">
          <p>📧 test@example.com</p>
          <p>🔐 Password: 123456</p>
          <p className="small-text">Or create your own account using Sign Up tab above</p>
        </div>
      </div>

      <div className="login-footer">
        <p>© 2026 MediCare Portal. All rights reserved.</p>
        <p className="footer-link">Secure Healthcare Management System</p>
      </div>
    </div>
  );
}
