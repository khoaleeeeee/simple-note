<script>
	import { note, notes } from '$lib/stores';
	import utils from '$lib/utils';

	let title;
	$: if ($note) title = $note.title || 'New Note';

	const debouncedSaveNote = utils.debounce(async () => {
		await utils.saveNote({ ...$notes[0], detals: [{}] });
	}, 500);

	const onTitleChange = async (e) => {
		title = e.target.value;
		notes.update((allNotes) => {
			const noteIndex = allNotes.findIndex((n) => n.uuid === $note.uuid);
			if (noteIndex > -1) {
				let updatedNote = { ...allNotes[noteIndex], title };
				allNotes.splice(noteIndex, 1); // Remove the note from its current position
				allNotes.unshift(updatedNote); // Add it to the beginning
			}
			return allNotes;
		});
		debouncedSaveNote();
	};
</script>

<input
	value={title}
	class="w-full p-4 focus:outline-none border-l-2 border-r-2 dark:border-gray-500 border-gray-800 shadow-sm text-2xl font-bold font-mono bg-gray-200 dark:bg-gray-900 dark:text-white text-black transition-colors duration-300 ease-in-out"
	placeholder="Title"
	on:input={onTitleChange}
	disabled={$notes.length === 0}
/>
