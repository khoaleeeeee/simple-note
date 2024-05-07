<script>
	import { DarkMode } from 'flowbite-svelte';

	const onClick = () => {
		document.dispatchEvent(new CustomEvent('theme-changed'));
	};
</script>

<button on:click={onClick}>
	<DarkMode class="text-primary-500 dark:text-primary-600 " />
</button>
