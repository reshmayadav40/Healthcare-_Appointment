import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import "./SelectDoctor.css";

export default function SelectDoctor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Sample doctors data
  const sampleDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15 years",
      rating: 4.9,
      patients: 1250,
      available: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "12 years",
      rating: 4.8,
      patients: 980,
      available: true,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      experience: "10 years",
      rating: 4.7,
      patients: 750,
      available: true,
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "18 years",
      rating: 4.9,
      patients: 1500,
      available: true,
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Pediatrics",
      experience: "14 years",
      rating: 4.8,
      patients: 890,
      available: true,
    },
    {
      id: 6,
      name: "Dr. Robert Smith",
      specialty: "General Medicine",
      experience: "20 years",
      rating: 4.9,
      patients: 2000,
      available: true,
    },
  ];

  useEffect(() => {
    setDoctors(sampleDoctors);
    setFilteredDoctors(sampleDoctors);
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (doc) => doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialty, doctors]);

  const specialties = [
    "all",
    ...new Set(doctors.map((doc) => doc.specialty.toLowerCase())),
  ];

  const handleSelectDoctor = (doctorId) => {
    navigate(`/book/${doctorId}`);
  };

  return (
    <div className="select-doctor-wrapper">
      <div className="page-wrapper">
        {/* Header */}
        <section className="select-doctor-header">
          <div className="header-content">
            <h1>🏥 Select a Doctor</h1>
            <p>Choose from our network of experienced healthcare professionals</p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="search-filter-section">
          <div className="search-box">
            <FiSearch size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-chips">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`filter-chip ${
                  selectedSpecialty === specialty ? "active" : ""
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty === "all"
                  ? "All Specialties"
                  : specialty.charAt(0).toUpperCase() + specialty.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="doctors-section">
          {filteredDoctors.length > 0 ? (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-header">
                    <div className="doctor-avatar">
                      {doctor.name.split(" ")[0][0]}
                      {doctor.name.split(" ")[1][0]}
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="doctor-stats">
                    <div className="stat">
                      <span className="stat-label">Experience</span>
                      <span className="stat-value">{doctor.experience}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">⭐ {doctor.rating}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Patients</span>
                      <span className="stat-value">{doctor.patients}+</span>
                    </div>
                  </div>

                  <div className="doctor-status">
                    {doctor.available && (
                      <span className="status-badge available">✓ Available</span>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-book"
                    onClick={() => handleSelectDoctor(doctor.id)}
                  >
                    Book Appointment <FiArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">
                No doctors found matching your criteria
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Help Section */}
        <section className="help-section">
          <div className="help-card">
            <h3>💡 Need Help?</h3>
            <p>
              Browse our experienced doctors, check their specialties and ratings,
              then book an appointment. You can choose your preferred date and time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
