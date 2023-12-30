import axios from 'axios';

const autocomplete = async (promptText) => {
	try {
		const response = await axios.post('api/openai/autocomplete', { promptText });
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default autocomplete;
