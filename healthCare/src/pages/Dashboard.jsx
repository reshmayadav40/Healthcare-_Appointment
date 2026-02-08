import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointments } from "../api/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { formatDateTime } from "../utils/helpers";
import { FiCalendar, FiTrendingUp, FiDroplet, FiActivity } from "react-icons/fi";
import { useState, useEffect } from "react";
import "./Dashboard.css";

// Lazy load health records component
const HealthTips = () => (
  <div className="health-tips-grid">
    <div className="health-tip-card">
      <div className="health-tip-icon">💧</div>
      <h4>Stay Hydrated</h4>
      <p>Drink at least 8-10 glasses of water daily for optimal health.</p>
    </div>
    <div className="health-tip-card">
      <div className="health-tip-icon">🏃</div>
      <h4>Regular Exercise</h4>
      <p>Walk 30 minutes daily and do light exercises to stay fit.</p>
    </div>
    <div className="health-tip-card">
      <div className="health-tip-icon">😴</div>
      <h4>Quality Sleep</h4>
      <p>Aim for 7-9 hours of quality sleep every night.</p>
    </div>
    <div className="health-tip-card">
      <div className="health-tip-icon">🥗</div>
      <h4>Healthy Diet</h4>
      <p>Include fruits, vegetables, and lean proteins in your diet.</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // Load appointments from localStorage
  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    // Filter appointments for current user and upcoming
    const userAppointments = appointments.filter(
      (apt) => apt.userId === user?.id && new Date(apt.date) >= new Date()
    );
    // Sort by date
    userAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingAppointments(userAppointments);
  }, [user?.id]);

  return (
    <div className="dashboard-wrapper">
      <div className="page-wrapper">
        {/* Header Section */}
        <section className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.name || user?.email}! 👋</h1>
            <p className="welcome-subtitle">Here's your health dashboard overview</p>
          </div>
          <Link to="/search" className="btn btn-primary btn-find-doctor">
            <FiCalendar size={20} /> Find Doctor
          </Link>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon upcoming">
              <FiCalendar size={32} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Upcoming Appointments</p>
              <h3>{upcomingAppointments.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon health">
              <FiTrendingUp size={32} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Health Score</p>
              <h3>Excellent</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon vitals">
              <FiActivity size={32} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Recent Records</p>
              <h3>4 Files</h3>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="upcoming-section">
          <div className="section-header">
            <h2>📅 Upcoming Appointments</h2>
            <Link to="/appointments" className="btn-link">
              View All →
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="appointments-list">
              {upcomingAppointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-date">
                    <span className="day">
                      {new Date(apt.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                      })}
                    </span>
                    <span className="month">
                      {new Date(apt.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <h4>{apt.doctorName}</h4>
                    <p className="specialty">{apt.specialty}</p>
                    <p className="time">⏰ {apt.time}</p>
                  </div>
                  <span className="status-badge">Confirmed</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">No upcoming appointments</p>
              <Link to="/select-doctor" className="btn btn-primary">
                Book Your First Appointment
              </Link>
            </div>
          )}
        </section>

        {/* Health Tips */}
        <section className="health-tips-section">
          <h2>💡 Health Tips</h2>
          <HealthTips />
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-card">
            <h3>Regular Checkups are Essential</h3>
            <p>Schedule regular appointments with our doctors for preventive care.</p>
            <Link to="/search" className="btn btn-secondary">
              Find a Doctor
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
