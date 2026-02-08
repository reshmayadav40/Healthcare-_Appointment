import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchDoctorById, bookAppointment } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { formatDate } from "../utils/helpers";
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import "./Book.css";

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, date: e.target.value }));
    setError("");
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }));
    setError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.date) {
        setError("Please select a date");
        return false;
      }
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setError("Please select a future date");
        return false;
      }
    } else if (step === 2) {
      if (!formData.time) {
        setError("Please select a time slot");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Create appointment object
      const appointmentData = {
        id: Date.now().toString(),
        userId: user?.id,
        doctorId: parseInt(id),
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: formData.date,
        time: formData.time,
        status: "Upcoming",
        notes: formData.notes,
        bookedDate: new Date().toISOString(),
      };

      // Save to localStorage
      const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      appointments.push(appointmentData);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader />;

  if (!doctor) {
    return (
      <div className="error-page">
        <p>Doctor not found</p>
        <button className="btn btn-primary" onClick={() => navigate("/search")}>
          Back to Search
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="book-wrapper">
        <div className="page-wrapper">
          <div className="success-state">
            <div className="success-icon">✅</div>
            <h2>Appointment Booked Successfully!</h2>
            <div className="success-details">
              <p>
                <strong>Doctor:</strong> {doctor.name}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(formData.date)}
              </p>
              <p>
                <strong>Time:</strong> {formData.time}
              </p>
              <p>
                <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
              </p>
            </div>
            <p className="success-message">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-wrapper">
      <div className="page-wrapper">
        <div className="book-header">
          <h1>Book Appointment</h1>
          <p>Schedule your consultation with {doctor.name}</p>
        </div>

        <div className="book-container">
          {/* Doctor Info Card */}
          <div className="doctor-info-card">
            <div className="info-header">
              <div className="avatar">{doctor.name.split(" ")[0][0]}</div>
              <div className="doctor-details">
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <p className="location">📍 {doctor.location}</p>
              </div>
            </div>
            <div className="fee-info">
              <span className="fee-label">Consultation Fee:</span>
              <span className="fee-amount">₹{doctor.consultationFee}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="stepper">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <p>Select Date</p>
            </div>
            <div className="step-connector">
              <div className={`connector-line ${step > 1 ? "completed" : ""}`}></div>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <p>Select Time</p>
            </div>
            <div className="step-connector">
              <div className={`connector-line ${step > 2 ? "completed" : ""}`}></div>
            </div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <p>Confirm</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content">
            {error && <div className="alert alert-error">{error}</div>}

            {/* Step 1: Date Selection */}
            {step === 1 && (
              <div className="step-content">
                <h3>Select Appointment Date</h3>
                <div className="form-group">
                  <label htmlFor="date" className="required">
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Appointment date"
                  />
                </div>

                {formData.date && (
                  <div className="date-preview">
                    <p>
                      Selected Date:{" "}
                      <strong>{formatDate(formData.date)}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <div className="step-content">
                <h3>Select Time Slot</h3>
                <p className="step-subtitle">
                  Available slots on {formatDate(formData.date)}
                </p>
                <div className="time-slots">
                  {doctor.slots.map((slot) => (
                    <button
                      key={slot}
                      className={`time-slot ${
                        formData.time === slot ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSelect(slot)}
                      type="button"
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {formData.time && (
                  <div className="time-preview">
                    <p>
                      Selected Time: <strong>{formData.time}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="step-content">
                <h3>Confirm Appointment Details</h3>

                <div className="confirmation-card">
                  <div className="confirmation-row">
                    <span className="label">Doctor:</span>
                    <span className="value">{doctor.name}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="label">Specialty:</span>
                    <span className="value">{doctor.specialty}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(formData.date)}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="label">Time:</span>
                    <span className="value">{formData.time}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="label">Consultation Fee:</span>
                    <span className="value fee">₹{doctor.consultationFee}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any specific concerns or health history to mention?"
                    value={formData.notes}
                    onChange={handleInputChange}
                    aria-label="Additional notes"
                  ></textarea>
                </div>

                <div className="confirmation-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    aria-label="Agree to terms and conditions"
                  />
                  <label htmlFor="terms">
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="button-group">
            {step > 1 && (
              <button
                className="btn btn-outline"
                onClick={handlePrev}
                disabled={isSubmitting}
              >
                <FiArrowLeft size={18} /> Previous
              </button>
            )}

            {step < 3 ? (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                Next <FiArrowRight size={18} />
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm Appointment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
