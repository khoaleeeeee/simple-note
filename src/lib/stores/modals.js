import { writable } from 'svelte/store';

const modals = writable({
	settings: false,
	profile: false,
	sessionExpired: false
});

export default modals;
