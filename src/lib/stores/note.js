import { writable } from 'svelte/store';
import content from './content';
import title from './title';

const note = writable({});
// change content and title when note changes
note.subscribe((value) => {
	if (!value) return;
	content.set(value.content);
	title.set(value.title);
});

export default note;
