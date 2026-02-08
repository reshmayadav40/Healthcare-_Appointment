import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHome, FiUser, FiCalendar, FiSearch } from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">🏥 MediCare</div>
        <div className="user-info">
          <div className="avatar">{(user.name || user.email || "U")[0]}</div>
          <div className="user-meta">
            <div className="user-name">{user.name || user.email}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="side-link">
          <FiHome /> <span>Dashboard</span>
        </Link>

        <Link to="/profile" className="side-link">
          <FiUser /> <span>Profile</span>
        </Link>

        <Link to="/appointments" className="side-link">
          <FiCalendar /> <span>Booked</span>
        </Link>

        <Link to="/search" className="side-link">
          <FiSearch /> <span>Search</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <small>© MediCare</small>
      </div>
    </aside>
  );
}
