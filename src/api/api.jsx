import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Doctors
export const fetchDoctors = async () => {
  const res = await api.get("/doctors");
  return res.data;
};

export const fetchDoctorById = async (id) => {
  const res = await api.get(`/doctors/${id}`);
  return res.data;
};

// Appointments
export const fetchAppointments = async (userId) => {
  const res = await api.get("/appointments", {
    params: { userId },
  });
  return res.data;
};

export const bookAppointment = async (appointmentData) => {
  const res = await api.post("/appointments", appointmentData);
  return res.data;
};

export const updateAppointment = async (id, data) => {
  const res = await api.patch(`/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};

// Medical Records
export const fetchRecords = async (userId) => {
  const res = await api.get("/records", {
    params: { userId },
  });
  return res.data;
};

// Users
export const fetchUserByEmail = async (email) => {
  const res = await api.get("/users", {
    params: { email },
  });
  return res.data;
};

export const createUser = async (userData) => {
  const res = await api.post("/users", userData);
  return res.data;
};

export const updateUser = async (id, userData) => {
  const res = await api.patch(`/users/${id}`, userData);
  return res.data;
};

export default api;
