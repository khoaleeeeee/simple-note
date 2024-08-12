import api from '$lib/api';
import merge from './merge';
import { note, notes, user } from '$lib/stores';
import { get } from 'svelte/store';
import decrypt from '$lib/utils/decrypt';

const decryptDeltas = (deltas) => {
	return deltas.map((delta) => {
		return {
			...delta,
			text: decrypt(delta.text)
		};
	});
};

const getNote = async () => {
	const u = get(user);

	try {
		let result = await api.notes.get({ user_uuid: u.uuid });
		if (!result) return;

		result.map((n) => {
			n.deltas = decryptDeltas(n.deltas);
			const content = merge(n.deltas);
			n.content = content;
			return n;
		});

		notes.set(result);
		if (result.length > 0) note.set(result[0]);
	} catch (err) {
		throw new Error(`Something wrong while getting notes`, err);
	}
};

export default getNote;
