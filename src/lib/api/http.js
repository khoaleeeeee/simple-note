import axios from 'axios';

const PORT = import.meta.env.VITE_API_PORT || '';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${PORT}`;
axios.defaults.withCredentials = true;

const http = axios.create({
	baseURL: `${API_BASE_URL}`
});

export default http;
