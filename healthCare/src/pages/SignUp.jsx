import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/helpers";
import "./SignUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    bloodType: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!formData.age) {
      setError("Age is required");
      return;
    }

    if (!formData.bloodType) {
      setError("Blood type is required");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[SignUp] Attempting signup for:", formData.email);
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("[SignUp] Existing users count:", existingUsers.length);
      
      const userExists = existingUsers.some((u) => u.email === formData.email);

      if (userExists) {
        console.log("[SignUp] Email already registered:", formData.email);
        setError("This email is already registered. Please login instead.");
        return;
      }

      // Create user object
      const newUser = {
        id: Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        password: formData.password, // In production, hash this!
        phone: formData.phone,
        age: parseInt(formData.age),
        bloodType: formData.bloodType,
        joinDate: new Date().toISOString(),
      };

      // Save to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      console.log("[SignUp] User saved to localStorage", newUser.email);
      console.log("[SignUp] Total users now:", updatedUsers.length);

      // Login immediately
      login(newUser);
      console.log("[SignUp] User logged in, redirecting to dashboard");
      navigate("/dashboard");
    } catch (err) {
      setError("Sign up failed. Please try again.");
      console.error("[SignUp] Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-icon">✨</div>
          <h1>Create Account</h1>
          <p>Join MediCare Portal Today</p>
        </div>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">
            Login
          </Link>
          <button className="auth-tab active" disabled>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSignUp} className="signup-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName" className="required">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-label="Full name"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="required">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-label="Email address"
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="required">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-label="Phone number"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="required">
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                disabled={isSubmitting}
                min="18"
                max="120"
                aria-label="Age"
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodType" className="required">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-label="Blood type"
                aria-required="true"
              >
                <option value="">Select Blood Type</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="required">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-label="Password"
                aria-required="true"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="required">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-label="Confirm password"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large btn-signup"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>

      <div className="signup-footer-text">
        <p>© 2026 MediCare Portal. All rights reserved.</p>
        <p className="footer-link">Secure Healthcare Management System</p>
      </div>
    </div>
  );
}
