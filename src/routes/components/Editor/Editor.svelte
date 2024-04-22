<script>
	import Title from './Title.svelte';
	import Content from './Content.svelte';
	import { sidebar } from '$lib/stores';

	$: open = $sidebar.expanded;
</script>

<div class="flex flex-col items-center justify-center" class:open>
	<div class="w-full h-screen max-w-6xl shadow-lg rounded">
		<Title />
		<Content />
	</div>
</div>

<style>
	.flex {
		margin-left: 0;
		transition: margin-left 0.3s ease-in-out;
	}
	.open {
		margin-left: 25%;
		transition: 0.3s ease-in-out;
	}
</style>
