<script>
	import Topbar from '$lib/components/Topbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Editor from './components/Editor/Editor.svelte';
	import { note, notes, user } from '$lib/stores';
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import { goto } from '$app/navigation';

	const getNotes = async () => {
		try {
			const result = await api.notes.get({ user_uuid: $user.uuid });
			if (!result) return;
			notes.set(result);
			if (result.length > 0) note.set(result[0]);
		} catch (err) {
			console.log(err);
			throw new Error(`Something wrong while getting notes`, err);
		}
	};

	onMount(async () => {
		const userUuid = localStorage.getItem('user_uuid');
		if (!userUuid) {
			goto('/auth');
			return;
		} else {
			$user.uuid = userUuid;
		}
		await getNotes();
	});
</script>

<div class="h-full">
	<Topbar />
	<Sidebar />
	<Editor />
</div>
