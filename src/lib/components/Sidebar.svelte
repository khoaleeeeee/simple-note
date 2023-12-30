<script>
	import sidebar from '$lib/stores/sidebar';
	import NoteCard from './NoteCard.svelte';
	import { note, notes } from '$lib/stores';

	$: open = $sidebar.expanded;

	const updateContentAndTitle = (selected) => {
		note.set(selected);
	};
</script>

<aside class="fixed bg-third-dark shadow-lg overflow-auto w-1/4 h-full" class:open>
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
						<NoteCard {note} />
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

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
