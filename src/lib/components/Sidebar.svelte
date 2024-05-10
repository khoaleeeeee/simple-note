<script>
	import sidebar from '$lib/stores/sidebar';
	import NoteCard from './NoteCard.svelte';
	import { note, notes } from '$lib/stores';

	$: open = $sidebar.expanded;
	let activeNote = $notes[0];

	const updateContentAndTitle = (selected) => {
		note.set(selected);
		activeNote = selected;
	};
</script>

<div>
	{#if $sidebar.expanded}
		<div
			class="fixed inset-0 bg-black bg-opacity-50 z-40 sm:block md:hidden"
			on:click={() => ($sidebar.expanded = false)}
		/>
	{/if}
	<aside
		class="fixed h-full z-40 bg-third-light dark:bg-third-dark shadow-lg overflow-auto xl:w-1/4 sm:w-4/5"
		class:open
	>
		{#if $notes.length === 0}
			<div class="w-full justify-center flex flex-row mt-20">
				<span class=" items-center text-xl"> No Notes Yet! </span>
			</div>
		{/if}
		<nav class="pt-3">
			<ul>
				{#each $notes as note}
					<li>
						<button on:click={() => updateContentAndTitle(note)} class="menu-item">
							<NoteCard {note} {activeNote} />
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
</div>

<style lang="postcss">
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.menu-item {
		@apply transition px-2 py-1 text-primary-light rounded-lg flex w-full;
	}

	.open {
		left: 0;
	}
</style>
