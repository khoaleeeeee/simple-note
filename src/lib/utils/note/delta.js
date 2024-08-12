import { diff_match_patch } from 'diff-match-patch';

const dmp = new diff_match_patch();

const delta = (oldText, newText) => {
	const diffs = dmp.diff_main(oldText, newText);
	dmp.diff_cleanupSemantic(diffs);

	let index = 0;
	const deltas = [];

	for (const [op, text] of diffs) {
		if (op === 0) {
			// No change
			index += text.length;
		} else if (op === 1) {
			// Insert
			deltas.push({ operation: 'insert', index, text });
			index += text.length;
		} else if (op === -1) {
			deltas.push({
				operation: 'delete',
				index,
				length: text.length
			});
		}
	}

	return deltas;
};

export default delta;
