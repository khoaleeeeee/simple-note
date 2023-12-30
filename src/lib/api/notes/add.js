import axios from 'axios';

const add = async (note) => {
	try {
		const resp = await axios.post('api/notes', {
			...note,
			user_uuid: 'e370b10c-91f7-4710-9e6d-a83eac251de6'
		});
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

export default add;
