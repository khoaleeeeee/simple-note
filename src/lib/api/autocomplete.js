import http from './http';

const autocomplete = async (title, promptText, apiKey, user_uuid) => {
	try {
		const response = await http.post('api/openai/autocomplete', {
			topic: title,
			promptText,
			apiKey,
			user_uuid
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default autocomplete;
