import axios from 'axios';

// axios instance for all apis
const API = axios.create({ baseURL: 'http://localhost:5000' });

// adding token in header
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// vehicles
export const fetchVehicle = (id) => API.get(`/vehicles/${id}`);
export const fetchVehicles = (page) => API.get(`/vehicles?page=${page}`);
export const createVehicle = (newVehicle) => API.post('/vehicles', newVehicle);
export const updateVehicle = (id, updatedVehicle) => API.patch(`/vehicles/${id}`, updatedVehicle);
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);

// cars
export const fetchCar = (id) => API.get(`/cars/${id}`);
export const fetchCars = (page) => API.get(`/cars?page=${page}`);
export const createCar = (newCar) => API.post('/cars', newCar);
export const updateCar = (id, updatedCar) => API.patch(`/cars/${id}`, updatedCar);
export const deleteCar = (id) => API.delete(`/cars/${id}`);

// auth
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
