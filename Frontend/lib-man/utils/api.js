// src/api/authApi.js
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
