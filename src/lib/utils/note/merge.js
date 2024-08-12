const merge = (deltas) => {
	// Sort deltas by modified_at timestamp
	deltas.sort((a, b) => new Date(a.modified_at) - new Date(b.modified_at));

	let textArray = [];

	for (const delta of deltas) {
		if (delta.operation === 'insert') {
			// Insert text at the specified index
			for (let i = 0; i < delta.text.length; i++) {
				textArray.splice(delta.index + i, 0, delta.text[i]);
			}
		} else if (delta.operation === 'delete') {
			// Delete text starting at the specified index
			textArray.splice(delta.index, delta.length);
		}
	}

	// Join the array into a string
	return textArray.join('');
};
export default merge;
