import { writable } from 'svelte/store';

const defaultNote = [];

const notes = writable(defaultNote);

export default notes;
