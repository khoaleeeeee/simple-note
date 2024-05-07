<script>
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;
	const dispatch = createEventDispatcher();
	export let custom = '';
	const defaultClass =
		'dark:bg-primary-btn-dark bg-primary-btn hover:bg-primary-btn-hover dark:hover:bg-primary-btn-dark-hover text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-primary-btn-disabled dark:disabled:bg-primary-btn-disabled-dark dark:disabled:text-gray-500 dark:disabled:border-gray-800 dark:disabled:hover:bg-primary-btn-disabled-dark dark:disabled:hover:text-gray-500 dark:disabled:hover:border-gray-800 dark:disabled:cursor-not-allowed disabled:hover:bg-primary-btn-disabled disabled:hover:text-gray-500 disabled:hover:border-gray-800 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out';
</script>

<button class={defaultClass + custom} {disabled} on:click={() => dispatch('click')}><slot /></button
>
