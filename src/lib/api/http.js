import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const http = axios.create({
	baseURL: `${API_BASE_URL}`
});

export default http;
