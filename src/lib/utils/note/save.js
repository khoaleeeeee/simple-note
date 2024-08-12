import api from '$lib/api';
import { user } from '$lib/stores';
import { get } from 'svelte/store';
import encrypt from '$lib/utils/encrypt';

const encryptDeltas = (deltas) => {
	return deltas.map((delta) => {
		return {
			...delta,
			text: encrypt(delta.text)
		};
	});
};

/**
 * Saves a note to the database
 * @param {Object} note - The note to save
 * @param {string} note.title - The title of the note
 * @param {string} note.content - The content of the note
 * @param {Date} note.lastModified - The date the note was last modified
 * @returns {Promise} - A promise that resolves when the note is saved
 */
const save = async (note) => {
	const { uuid } = get(user);
	try {
		note.deltas = encryptDeltas(note.deltas);

		const savedNote = await api.notes.add({
			note: { ...note, content: '' },
			user_uuid: uuid
		});

		return savedNote;
	} catch (error) {
		console.error(error);
	}
};
export default save;
