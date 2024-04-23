import http from '../http';

const get = async (uuid) => {
	try {
		const resp = await http.get('/api/users', {
			params: {
				uuid
			}
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default get;
