import { writable } from 'svelte/store';

const sidebar = writable({
	expanded: false
});

export default sidebar;
