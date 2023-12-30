import { writable } from 'svelte/store';

const mode = writable('vim');

export default mode;
