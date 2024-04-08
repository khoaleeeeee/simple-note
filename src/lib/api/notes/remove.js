import http from '../http';

const remove = async ({ note, user_uuid }) => {
	try {
		const resp = await http.post('api/notes/remove', {
			user_uuid,
			uuid: note.uuid
		});

		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default remove;
