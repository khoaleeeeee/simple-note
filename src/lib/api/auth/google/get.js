import http from '$lib/api/http';

const get = async ({ code }) => {
	try {
		const resp = await http.get('/api/auth/google', {
			params: {
				code
			}
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default get;
