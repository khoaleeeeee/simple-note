<script>
	import { size, sidebar } from '$lib/stores';
	import { autocomplete, title, content, notes, note } from '$lib/stores';
	import utils from '$lib/utils';

	let editableDiv;
	let contentLoaded = false;
	const suggestion = utils.createAutocomplete({ editableDiv });
	const vim = utils.createVim({ editableDiv });

	$: open = $sidebar.expanded;

	$: if ($note && editableDiv) {
		title.set($note.title);
		content.set($note.content);
		editableDiv.innerText = $note.content;
	}

	$: if (editableDiv) {
		document.addEventListener('removeSuggestion', suggestion.removeSuggestion());
		if (!contentLoaded) {
			editableDiv.innerText = $content;
			vim.setEditableDiv(editableDiv);
			suggestion.setEditableDiv(editableDiv);
			if (content) contentLoaded = true;
		}
	}

	const handleKeyDown = (event) => {
		vim.keydown(event);
		suggestion.keydown(event, (text) => content.set(text));
	};

	const handleInput = async () => {
		if (!contentLoaded) return;
		content.set(editableDiv.innerText);
		await onContentChange();
	};

	const debouncedSaveNote = utils.debounce(async () => {
		await utils.saveNote($notes[0]);
	}, 1000);

	const onTitleChange = async () => {
		notes.update((allNotes) => {
			const noteIndex = allNotes.findIndex((n) => n.uuid === $note.uuid);
			if (noteIndex > -1) {
				let updatedNote = { ...allNotes[noteIndex], title: $title || 'New Note' };
				allNotes.splice(noteIndex, 1); // Remove the note from its current position
				allNotes.unshift(updatedNote); // Add it to the beginning
			}
			return allNotes;
		});

		debouncedSaveNote();
	};
	const onContentChange = async () => {
		notes.update((allNotes) => {
			const noteIndex = allNotes.findIndex((n) => n.uuid === $note.uuid);
			if (noteIndex > -1) {
				let updatedNote = { ...allNotes[noteIndex], content: $content };
				allNotes.splice(noteIndex, 1); // Remove the note from its current position
				allNotes.unshift(updatedNote); // Add it to the beginning
			}
			return allNotes;
		});
		debouncedSaveNote();

		if (!$autocomplete || vim.getMode() !== 'insert') return;
		await suggestion.fetchSuggestion($content);
	};
</script>

<div class="flex flex-col items-center justify-center h-5/6" class:open>
	<div class="w-full h-full max-w-6xl shadow-lg rounded">
		<input
			bind:value={$title}
			class="w-full p-4 border-0 border-l border-r border-white shadow-sm bg-gray-900 text-2xl font-bold font-mono"
			placeholder="Title"
			on:input={onTitleChange}
			disabled={$notes.length === 0}
		/>

		<div
			contenteditable="true"
			bind:this={editableDiv}
			class="editable-div w-full p-4 border-0 border-l border-r border-white h-full bg-gray-900 text-white font-mono"
			placeholder="Start typing..."
			style="font-size: {$size}px;"
			on:input={handleInput}
			on:keydown={handleKeyDown}
		/>
	</div>
</div>

<style>
	.flex {
		margin-left: 0;
		transition: margin-left 0.3s ease-in-out;
	}
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

	.open {
		margin-left: 25%;
		transition: 0.3s ease-in-out;
	}
</style>
