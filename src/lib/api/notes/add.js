import http from '../http';

const add = async ({ note, user_uuid }) => {
	try {
		const resp = await http.post('api/notes/add', {
			...note,
			user_uuid
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default add;
