import axios from 'axios';

// Create Axios Instance targeting local json-server REST API
const API = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// REST API Service Operations (Strictly using REST endpoints from db.json)

// GET /doctors
export const fetchDoctors = async () => {
  const response = await API.get('/doctors');
  return response.data;
};

// GET /doctors/:id
export const fetchDoctorById = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};

// GET /appointments
export const fetchAppointments = async () => {
  const response = await API.get('/appointments');
  return response.data;
};

// POST /appointments
export const createAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};

// PUT /appointments/:id
export const updateAppointment = async (id, updatedData) => {
  const response = await API.put(`/appointments/${id}`, updatedData);
  return response.data;
};

// DELETE /appointments/:id
export const deleteAppointment = async (id) => {
  await API.delete(`/appointments/${id}`);
  return { success: true, id };
};
