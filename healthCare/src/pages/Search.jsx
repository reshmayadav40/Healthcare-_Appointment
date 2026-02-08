import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors } from "../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { filterBySpecialty, filterByLocation } from "../utils/helpers";
import { FiMapPin, FiStar, FiUsers, FiCheckCircle } from "react-icons/fi";
import "./Search.css";

export default function Search() {
  const { user } = useAuth();
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingDoctorId, setBookingDoctorId] = useState(null);
  const [bookedDoctors, setBookedDoctors] = useState(() => {
    // Load booked doctors from localStorage
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userAppointments = appointments.filter((a) => a.userId === user?.id);
    return new Set(userAppointments.map((a) => a.doctorId));
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const specialties = useMemo(
    () => [...new Set(data.map((d) => d.specialty))],
    [data]
  );

  const locations = useMemo(
    () => [...new Set(data.map((d) => d.location))],
    [data]
  );

  const filtered = useMemo(() => {
    let result = data;
    result = filterBySpecialty(result, specialty);
    result = filterByLocation(result, location);
    if (availabilityOnly) {
      result = result.filter((d) => d.available);
    }
    return result;
  }, [data, specialty, location, availabilityOnly]);

  const handleInstantBook = (doctor) => {
    // Create appointment with first available slot
    const appointmentData = {
      id: Date.now().toString(),
      userId: user?.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: new Date().toISOString().split('T')[0], // Today's date
      time: doctor.slots[0] || "10:00 AM", // First available slot
      status: "Upcoming",
      notes: "",
      bookedDate: new Date().toISOString(),
    };

    // Save to localStorage
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Add to booked doctors set
    setBookedDoctors((prev) => new Set([...prev, doctor.id]));

    // Show success message
    setBookingDoctorId(doctor.id);
    setBookingMessage(`✅ Appointment booked with ${doctor.name}!`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setBookingMessage("");
      setBookingDoctorId(null);
    }, 3000);

    console.log("[Search] Instant booking:", appointmentData);
  };

  const handleCancelBooking = (doctorId) => {
    if (window.confirm("Cancel this appointment?")) {
      // Remove from localStorage
      const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const updated = appointments.filter(
        (a) => !(a.userId === user?.id && a.doctorId === doctorId)
      );
      localStorage.setItem("appointments", JSON.stringify(updated));

      // Remove from booked doctors set
      setBookedDoctors((prev) => {
        const newSet = new Set(prev);
        newSet.delete(doctorId);
        return newSet;
      });

      setBookingMessage(`✅ Appointment cancelled!`);
      setTimeout(() => setBookingMessage(""), 3000);

      console.log("[Search] Booking cancelled for doctor:", doctorId);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="search-wrapper">
      <div className="page-wrapper">
        {/* Booking Success Message */}
        {bookingMessage && (
          <div className="booking-success-message">
            {bookingMessage}
            <p style={{ fontSize: "0.85rem", marginTop: "0.3rem", opacity: 0.9 }}>
              Check your Booked tab to view or cancel
            </p>
          </div>
        )}

        {/* Header */}
        <section className="search-header">
          <h1>🔍 Find a Doctor</h1>
          <p>Search and filter doctors by specialty and location</p>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="specialty">Specialty</label>
              <select
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
              
            <div className="filter-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                />
                <span>Available Only</span>
              </label>
            </div>

            {(specialty || location || availabilityOnly) && (
              <button
                className="btn btn-outline btn-small"
                onClick={() => {
                  setSpecialty("");
                  setLocation("");
                  setAvailabilityOnly(false);
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Results Info */}
        <section className="results-info">
          <p>
            Found <strong>{filtered.length}</strong> doctor
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Doctors Grid */}
        {filtered.length > 0 ? (
          <section className="doctors-grid">
            {filtered.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-card-header">
                  <div className="doctor-avatar">
                    {doctor.name.split(" ")[0][0]}
                    {doctor.name.split(" ")[1][0]}
                  </div>
                  {doctor.available && (
                    <span className="availability-badge">
                      <FiCheckCircle size={16} /> Available
                    </span>
                  )}
                </div>

                <div className="doctor-card-body">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>

                  <div className="doctor-info">
                    <div className="info-item">
                      <FiMapPin size={16} />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="info-item">
                      <FiStar size={16} />
                      <span>{doctor.rating} rating</span>
                    </div>
                    <div className="info-item">
                      <FiUsers size={16} />
                      <span>{doctor.experience} exp.</span>
                    </div>
                  </div>

                  <div className="doctor-consultation">
                    <span className="fee">₹{doctor.consultationFee}</span>
                    <span className="per-session">per session</span>
                  </div>

                  <div className="available-slots">
                    <p className="slots-label">Available Slots:</p>
                    <div className="slots-list">
                      {doctor.slots.map((slot, idx) => (
                        <span key={idx} className="slot-badge">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="doctor-card-footer">
                  {bookedDoctors.has(doctor.id) ? (
                    <button
                      onClick={() => handleCancelBooking(doctor.id)}
                      className="btn btn-danger btn-small"
                    >
                      Cancel Booking
                    </button>
                  ) : doctor.available ? (
                    <button
                      onClick={() => handleInstantBook(doctor)}
                      className="btn btn-primary btn-small"
                      disabled={bookingDoctorId === doctor.id}
                    >
                      {bookingDoctorId === doctor.id ? "Booking..." : "Book Doctor"}
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-small" disabled>
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No Doctors Found</h3>
            <p className="empty-state-text">
              Try adjusting your filters to find available doctors
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSpecialty("");
                setLocation("");
                setAvailabilityOnly(false);
              }}
            >
              Clear All Filters
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
