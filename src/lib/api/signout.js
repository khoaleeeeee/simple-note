import http from './http';

const signout = async () => {
	const response = await http.post('/api/signout');
	return response;
};

export default signout;
