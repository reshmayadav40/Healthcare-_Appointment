import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHome, FiSearch, FiCalendar, FiUser, FiLogOut } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">🏥</span>
          MediCare Portal
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <FiHome size={20} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              <FiSearch size={20} />
              Search Doctors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/appointments" className="nav-link">
              <FiCalendar size={20} />
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              <FiUser size={20} />
              Profile
            </Link>
          </li>
        </ul>

        <button onClick={handleLogout} className="btn btn-danger btn-small">
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
