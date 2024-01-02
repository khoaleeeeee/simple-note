<script>
	import '../app.css';
	import Topbar from '$lib/components/Topbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import MonacoEditor from './components/MonacoEditor.svelte';
	import ContenteditableNote from './components/ContenteditableNote.svelte';
	import { note, type, notes } from '$lib/stores';
	import { onMount } from 'svelte';
	import api from '$lib/api';

	const getNotes = async () => {
		try {
			const result = await api.notes.get();
			notes.set(result || []);
			if (result?.length > 0) note.set(result[0]);
		} catch (err) {
			console.log(err);
			throw new Error(`Something wrong while getting notes`, err);
		}
	};

	onMount(async () => {
		await getNotes();
	});
</script>

<div class="h-full">
	<Topbar />
	<Sidebar />
	<!-- {#if $type === 'code'} -->
	<!-- 	<MonacoEditor /> -->
	<!-- {:else} -->
	<ContenteditableNote />
	<!-- {/if} -->
	<slot />
</div>
