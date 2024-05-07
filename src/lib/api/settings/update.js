import http from '../http';

const update = async ({ user_uuid, setting }) => {
	try {
		const resp = await http.post('/api/settings', {
			user_uuid,
			setting
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default update;
