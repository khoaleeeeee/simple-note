<script>
	import Hamburger from './Hamburger.svelte';
	import AvatarDropdown from './Dropdown/AvatarDropdown.svelte';
	import Slider from './Slider.svelte';
	import { note, size, notes } from '$lib/stores';
	import utils from '$lib/utils';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';
	import DarkMode from './DarkMode.svelte';

	import { CirclePlusSolid } from 'flowbite-svelte-icons';

	const onNewNote = async () => {
		const newNote = {
			title: 'New Note',
			content: '',
			deltas: []
		};

		const saved = await utils.saveNote(newNote);
		$note = saved;

		notes.update((allNotes) => {
			let updatedNotes = [...allNotes];
			updatedNotes.unshift(saved);
			return updatedNotes;
		});
	};
</script>

<div class="sticky top-0 z-50" id="topbar">
	<header
		class="flex justify-between bg-primary-light dark:bg-secondary-dark p-4 items-center text-gray-600 border-b-2 dark:border-gray-500 border-gray-800"
	>
		<div class="flex flex-1 min-w-0">
			<nav class="flex">
				<Hamburger />
				<div class="hidden sm:block">
					<Logo />
				</div>
				<AvatarDropdown />
			</nav>
		</div>

		<div class="flex flex-1 justify-center hidden min-w-0 md:flex">
			<span class="text-gray-600 dark:text-white font-mono font-semibold mr-2">Font size</span>
			<Slider
				min={12}
				max={24}
				initialValue={$size || 16}
				on:change={(e) => {
					size.set(e.detail.value);
				}}
			/>
		</div>

		<DarkMode />

		<div class="flex flex-1 justify-end min-w-0 items-center">
			<Button on:click={onNewNote}>
				<span class="flex text-center font-semibold gap-1">
					<CirclePlusSolid class="w-6 h-6" />
					New Note
				</span>
			</Button>
		</div>
	</header>
</div>
