import axios from 'axios';

const remove = async (note) => {
	try {
		const resp = await axios.delete('api/notes', {
			params: {
				user_uuid: 'e370b10c-91f7-4710-9e6d-a83eac251de6',
				uuid: note.uuid
			}
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default remove;
