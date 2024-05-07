<script>
	import { notes, note, title } from '$lib/stores';
	import utils from '$lib/utils';
	import { onMount } from 'svelte';
	import { size } from '$lib/stores';
	import settings from '$lib/stores/settings';

	let isMobile = false;
	let editableDiv;
	let oldContent;
	let suggestion = null;
	let vim = null;

	// create vim if vim mode is enabled
	$: if ($settings.enableVim && editableDiv) {
		vim = utils.createVim({ editableDiv });
	}

	// create autocomplete if autocomplete is enabled
	$: if ($settings.enableAutocomplete && editableDiv) {
		suggestion = utils.createAutocomplete({ editableDiv });
	}

	// set the initial content of the editable div
	$: if (editableDiv && $note) {
		oldContent = $note.content;
		editableDiv.innerText = $note.content || '';
	}

	// enable vim and autocomplete if vim mode is enabled
	$: if (!isMobile) {
		if ($settings.enableVim && vim) vim.setEditableDiv(editableDiv);
		if ($settings.enableAutocomple) suggestion.setEditableDiv(editableDiv);
	}

	onMount(() => {
		const platform = navigator.platform.toLowerCase();
		isMobile =
			platform.includes('android') || platform.includes('iphone') || platform.includes('ipad');

		if (isMobile) return;
		if ($settings.enableAutocomplete) suggestion = utils.createAutocomplete({ editableDiv });
		if ($settings.enableVim) vim = utils.createVim({ editableDiv });

		if (suggestion) document.addEventListener('removeSuggestion', suggestion.removeSuggestion);
		document.addEventListener('insertSuggestion', saveNote);
	});

	const saveNote = async () => {
		const deltas = utils.delta(oldContent, editableDiv.innerText);
		await utils.saveNote({ ...$notes[0], deltas });
		oldContent = editableDiv.innerText;
	};

	const handleKeyDown = (event) => {
		if (isMobile) return;
		if ($settings.enableVim) vim.keydown(event);
		if ($settings.enableAutocomplete) suggestion.keydown(event);
	};

	const debouncedSaveNote = utils.debounce(async () => {
		await saveNote();
	}, 1000);

	const getAutoComplete = async () => {
		if (!$settings.enableAutocomplete) {
			if ($settings.enableVim && vim.getMode() !== 'insert') return;
		}
		if ($settings.enableAutocomplete) {
			await suggestion.fetchSuggestion($title, editableDiv.innerText);
		}
	};

	const onContentChange = async () => {
		notes.update((allNotes) => {
			const noteIndex = allNotes.findIndex((n) => n.uuid === $note.uuid);
			if (noteIndex > -1) {
				let updatedNote = { ...allNotes[noteIndex], content: editableDiv.innerText };
				allNotes.splice(noteIndex, 1); // Remove the note from its current position
				allNotes.unshift(updatedNote); // Add it to the beginning
			}
			return allNotes;
		});
		// await debouncedSaveNote();
		await getAutoComplete();
	};
</script>

<div
	role="textbox"
	tabindex="0"
	aria-label="content"
	contenteditable="true"
	bind:this={editableDiv}
	class="editable-div w-full p-4 border-0 border-l-2 border-r-2 border-gray-800 dark:border-gray-500 h-full font-mono {$notes.length !==
	0
		? ''
		: 'pointer-events-none'} bg-gray-200 dark:bg-gray-900 dark:text-white text-black transition-colors duration-300 ease-in-out"
	placeholder="Start typing..."
	style="font-size: {$size}px;"
	on:input={onContentChange}
	on:keydown={handleKeyDown}
	on:keyup={debouncedSaveNote}
/>

<style>
	.editable-div {
		overflow: auto;
		resize: none;
		outline: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		-webkit-user-modify: read-write-plaintext-only;
	}

	.editable-div[contenteditable='true']:empty:before {
		content: attr(placeholder);
		color: #888;
	}
</style>
