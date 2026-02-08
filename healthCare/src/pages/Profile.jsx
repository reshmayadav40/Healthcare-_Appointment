import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchRecords } from "../api/api";
import Loader from "../components/Loader";
import { formatDate } from "../utils/helpers";
import { FiEdit2, FiSave, FiX, FiDownload, FiTrendingUp, FiLogOut } from "react-icons/fi";
import "./Profile.css";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    bloodType: user?.bloodType || "",
    address: user?.address || "",
  });

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["records", user?.id],
    queryFn: () => fetchRecords(1),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dob: user?.dob || "",
      gender: user?.gender || "",
      bloodType: user?.bloodType || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="profile-wrapper">
      <div className="page-wrapper">
        <section className="profile-header">
          <h1>👤 My Profile</h1>
          <p>Manage your health information and medical records</p>
        </section>

        <div className="profile-content">
          {/* Profile Information */}
          <section className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 size={16} /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={handleSave}
                  >
                    <FiSave size={16} /> Save Changes
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={handleCancel}
                  >
                    <FiX size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-display">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{formData.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{formData.phone || "Not provided"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Date of Birth:</span>
                  <span className="value">{formData.dob || "Not provided"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Gender:</span>
                  <span className="value">{formData.gender || "Not provided"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Blood Type:</span>
                  <span className="value badge badge-success">
                    {formData.bloodType || "Not provided"}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Address:</span>
                  <span className="value">{formData.address || "Not provided"}</span>
                </div>
              </div>
            )}
          </section>

          {/* Health Records */}
          <section className="profile-section">
            <div className="section-header">
              <h2>📋 Medical Records</h2>
              <span className="record-count">{records.length} records</span>
            </div>

            {records.length > 0 ? (
              <div className="records-grid">
                {records.map((record) => (
                  <div key={record.id} className="record-card">
                    <div className="record-header">
                      <div className="record-icon">
                        {record.type === "Lab Report" ? "🧪" : "💗"}
                      </div>
                      <h4>{record.testName || record.metric}</h4>
                    </div>
                    <div className="record-body">
                      <p className="type">{record.type}</p>
                      <p className="date">📅 {formatDate(record.date)}</p>

                      {record.result && (
                        <div className="result">
                          <span className="label">Result:</span>
                          <span className={`badge badge-${record.result === "Normal" ? "success" : "warning"}`}>
                            {record.result}
                          </span>
                        </div>
                      )}

                      {record.value && (
                        <div className="value-display">
                          <span className="value-amount">{record.value}</span>
                          <span className="value-unit">{record.unit}</span>
                        </div>
                      )}

                      {record.details && (
                        <p className="details">{record.details}</p>
                      )}

                      {record.status && (
                        <span className={`status ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      )}
                    </div>
                    <div className="record-footer">
                      <button className="btn btn-outline btn-small">
                        <FiDownload size={14} /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3 className="empty-state-title">No Records Yet</h3>
                <p className="empty-state-text">
                  Your medical records will appear here after your appointments.
                </p>
              </div>
            )}
          </section>

          {/* Health Summary */}
          <section className="profile-section">
            <h2>Health Summary</h2>
            <div className="health-summary-grid">
              <div className="summary-card">
                <div className="summary-icon">💪</div>
                <h4>Overall Health</h4>
                <p className="summary-status excellent">Excellent</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📊</div>
                <h4>Last Checkup</h4>
                <p className="summary-date">Feb 1, 2026</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🏥</div>
                <h4>Active Prescriptions</h4>
                <p className="summary-count">0</p>
              </div>
              <div className="summary-card">
                <div className="summary-icon">⚠️</div>
                <h4>Alerts</h4>
                <p className="summary-count">None</p>
              </div>
            </div>
          </section>
        </div>

        {/* Logout Section */}
        <section className="logout-section">
          <div className="logout-card">
            <h3>Account Actions</h3>
            <button
              className="btn btn-danger btn-large"
              onClick={handleLogout}
            >
              <FiLogOut size={18} /> Logout
            </button>
            <p className="logout-help">You will be returned to the login page.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
