import http from '../http';

const get = async () => {
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
