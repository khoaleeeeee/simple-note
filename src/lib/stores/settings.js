import { writable } from 'svelte/store';

const settings = writable({
	enableVim: false,
	enableAutocomplete: false,
	openAIKey: ''
});

export default settings;
