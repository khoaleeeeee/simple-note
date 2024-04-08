import sidebar from './sidebar';
import size from './size';
import content from './content';
import title from './title';
import notes from './notes';
import note from './note';
import autocomplete from './autocomplete';
import user from './user';

const index = {
	user,
	sidebar,
	size,
	content,
	title,
	notes,
	note,
	autocomplete
};

export { index as default, note, sidebar, size, title, content, notes, autocomplete, user };
