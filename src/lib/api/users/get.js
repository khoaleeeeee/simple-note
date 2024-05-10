import http from '../http';

const get = async () => {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	if (API_BASE_URL.includes('localhost')) {
		return {
			uuid: '4d132e39-da34-4150-99fc-d3305d1ebdbc',
			name: 'Khoa Dep Trai',
			email: 'khoaleeeeee@gmail.com'
		};
	}

	try {
		const resp = await http.get('/api/users');

		if (resp.status === 403) {
			throw new Error('Session expired. Please login again.');
		} else if (resp.status !== 200) {
			throw new Error('Failed to fetch data.');
		}

		return resp.data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default get;
