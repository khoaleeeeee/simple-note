import http from '../http';

const get = async ({ user_uuid }) => {
	try {
		const resp = await http.get('/api/settings', {
			params: {
				user_uuid
			}
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default get;
