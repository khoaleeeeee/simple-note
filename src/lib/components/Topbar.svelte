<script>
	import Hamburger from './Hamburger.svelte';
	import Slider from './Slider.svelte';
	import { note, language, autocomplete, type, size, notes } from '$lib/stores';
	import utils from '$lib/utils';
	import Switch from './Switch.svelte';

	let selectedType = $type || 'note';
	let selectedLanguage = $language || 'javascript';

	$: type.set(selectedType);
	$: language.set(selectedLanguage);

	const onNewNote = async () => {
		const newNote = {
			title: 'New Note',
			content: '',
			deltas: []
		};

		notes.update((allNotes) => {
			let updatedNotes = [...allNotes];
			updatedNotes.unshift(newNote);
			return updatedNotes;
		});

		await utils.saveNote(newNote);
		note.set($notes[0]);
	};
</script>

<div class="sticky top-0 z-30" id="topbar">
	<header class="flex justify-between bg-secondary-dark p-4 items-center text-gray-600 border-b-2">
		<div class="flex justify-start">
			<nav class="flex">
				<Hamburger />
			</nav>
		</div>

		<div class="w-1/5 flex flex-row">
			<span class="text-white font-mono">Font size</span>
			<Slider
				min={12}
				max={24}
				initialValue={$size || 16}
				on:change={(e) => {
					size.set(e.detail.value);
				}}
			/>
		</div>

		<div class="flex flex-row w-1/3 justify-between items-center">
			<div class="flex flex-row items-center">
				<span class="text-white font-mono mr-2">Autocomplete</span>
				<Switch bind:checked={$autocomplete} />
			</div>
			<!-- <div class="flex flex-row"> -->
			<!-- 	<select -->
			<!-- 		bind:value={selectedType} -->
			<!-- 		class="mr-2 bg-white border border-gray-300 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500" -->
			<!-- 	> -->
			<!-- 		<option value="code">Code</option> -->
			<!-- 		<option value="note">Note</option> -->
			<!-- 	</select> -->
			<!-- 	{#if $type === 'code'} -->
			<!-- 		<select -->
			<!-- 			bind:value={selectedLanguage} -->
			<!-- 			class="mr-2 bg-white border border-gray-300 rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-500" -->
			<!-- 		> -->
			<!-- 			<option value="javascript">JavaScript</option> -->
			<!-- 			<option value="python">Python</option> -->
			<!-- 		</select> -->
			<!-- 	{/if} -->
			<!-- </div> -->

			<div>
				<button
					class="bg-primary-btn font-semibold hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					on:click={onNewNote}
				>
					New Note
				</button>
			</div>
		</div>
	</header>
</div>
