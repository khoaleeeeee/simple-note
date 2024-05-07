import sidebar from './sidebar';
import size from './size';
import content from './content';
import title from './title';
import notes from './notes';
import note from './note';
import user from './user';
import settings from './settings';
import modals from './modals';

const index = {
	modals,
	user,
	sidebar,
	size,
	content,
	title,
	notes,
	note,
	settings
};

export { index as default, modals, note, sidebar, size, title, content, notes, user, settings };
