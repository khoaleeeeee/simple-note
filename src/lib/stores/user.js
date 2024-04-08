import { writable } from 'svelte/store';

const user = {
	name: null,
	uuid: null,
	email: null
};

export default writable(user);
