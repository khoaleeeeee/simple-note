import axios from 'axios';

const PORT = import.meta.env.VITE_API_PORT || '';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const http = axios.create({
	baseURL: `${API_BASE_URL}:${PORT}`
});

export default http;
