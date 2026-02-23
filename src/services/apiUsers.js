import axios from "axios";

const API_URL = "http://localhost:5000/users";

export async function getAllUsers() {
  return await axios.get(`${API_URL}/getAllUsers`);
}

export async function deleteUser(id) {
  return await axios.delete(`${API_URL}/deleteUser/${id}`); //http://localhost:5000/users/deleteUser/625ed8f3e6f2c8b1a4d5f9c3
}

export async function updateUser(id, userData) {
  return await axios.put(`${API_URL}/updateUser/${id}`, userData);
}

export async function getUserById(id) {
  return await axios.get(`${API_URL}/getUserById/${id}`);
}

export async function addUesr(userData) {
  return await axios.post(`${API_URL}/addUser`, userData);
}

export async function getUser18() {
  return await axios.get(`${API_URL}/getUsers18`);
}
