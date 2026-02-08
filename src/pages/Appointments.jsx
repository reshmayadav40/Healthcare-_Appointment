import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { separateAppointments, formatDateTime } from "../utils/helpers";
import { FiCalendar, FiClock, FiMapPin, FiTrash2, FiEdit2 } from "react-icons/fi";
import "./Appointments.css";

export default function Appointments() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userAppointments = all.filter((a) => a.userId === user?.id);
    // sort by date
    userAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
    setAppointments(userAppointments);
  }, [user?.id]);

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const all = JSON.parse(localStorage.getItem("appointments") || "[]");
      const updated = all.filter((a) => a.id !== appointmentId);
      localStorage.setItem("appointments", JSON.stringify(updated));
      
      // Update local state
      setAppointments(updated.filter((a) => a.userId === user?.id));
      console.log("[Appointments] Appointment cancelled:", appointmentId);
    }
  };

  const { upcoming, past } = separateAppointments(appointments);

  const AppointmentCard = ({ appointment, isPast }) => (
    <div className="appointment-card">
      <div className="appointment-left">
        <div className="appointment-avatar">
          {appointment.doctorName.split(" ")[0][0]}
          {appointment.doctorName.split(" ")[1]?.[0] || ""}
        </div>
        <div className="appointment-info">
          <h4>{appointment.doctorName}</h4>
          <p className="specialty">{appointment.specialty}</p>
          <div className="appointment-meta">
            <span className="meta-item">
              <FiCalendar size={16} /> {appointment.date}
            </span>
            <span className="meta-item">
              <FiClock size={16} /> {appointment.time}
            </span>
          </div>
          {appointment.notes && (
            <p className="notes">📝 {appointment.notes}</p>
          )}
        </div>
      </div>

      <div className="appointment-right">
        <span className={`status-badge ${isPast ? "completed" : "upcoming"}`}>
          {appointment.status}
        </span>
        {!isPast && (
          <div className="appointment-actions">
            <button 
              className="action-btn delete" 
              title="Cancel appointment"
              onClick={() => handleCancelAppointment(appointment.id)}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="appointments-wrapper">
      <div className="page-wrapper">
        {/* Header */}
        <section className="appointments-header">
          <h1>📅 My Appointments</h1>
          <p>Manage your scheduled consultations</p>
        </section>

        {/* Tabs */}
        <section className="tabs-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming ({upcoming.length})
            </button>
            <button
              className={`tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past ({past.length})
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="appointments-content">
          {activeTab === "upcoming" && (
            <>
              {upcoming.length > 0 ? (
                <div className="appointments-list">
                  {upcoming.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      isPast={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <h3 className="empty-state-title">No Upcoming Appointments</h3>
                  <p className="empty-state-text">
                    You don't have any scheduled appointments. Book one now!
                  </p>
                  <Link to="/search" className="btn btn-primary btn-large">
                    Book an Appointment
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === "past" && (
            <>
              {past.length > 0 ? (
                <div className="appointments-list">
                  {past.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      isPast={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">✓</div>
                  <h3 className="empty-state-title">No Past Appointments</h3>
                  <p className="empty-state-text">
                    You haven't completed any appointments yet.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Appointment Statistics */}
        {appointments.length > 0 && (
          <section className="appointment-stats">
            <div className="stat-card">
              <h4>Total Appointments</h4>
              <p className="stat-number">{appointments.length}</p>
            </div>
            <div className="stat-card">
              <h4>Upcoming</h4>
              <p className="stat-number">{upcoming.length}</p>
            </div>
            <div className="stat-card">
              <h4>Completed</h4>
              <p className="stat-number">{past.length}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
