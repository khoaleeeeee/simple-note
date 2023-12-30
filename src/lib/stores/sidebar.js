import { writable } from 'svelte/store';

const sidebar = writable({
	expanded: true
});

export default sidebar;
