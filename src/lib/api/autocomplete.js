import axios from 'axios';

const autocomplete = async (title, promptText) => {
	try {
		const response = await axios.post('api/openai/autocomplete', { topic: title, promptText });
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default autocomplete;
