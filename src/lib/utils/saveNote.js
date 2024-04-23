import api from '$lib/api';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

/**
 * Saves a note to the database
 * @param {Object} note - The note to save
 * @param {string} note.title - The title of the note
 * @param {string} note.content - The content of the note
 * @param {Date} note.lastModified - The date the note was last modified
 * @returns {Promise} - A promise that resolves when the note is saved
 */
const saveNote = async (note) => {
	const { uuid } = get(user);
	try {
		const savedNote = await api.notes.add({ note: { ...note, content: '' }, user_uuid: uuid });

		return savedNote;
	} catch (error) {
		console.error(error);
	}
};
export default saveNote;
