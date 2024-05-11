<script>
	import Topbar from '$lib/components/Topbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Editor from './components/Editor/Editor.svelte';
	import SessionExpired from '../lib/components/SessionExpired.svelte';
	import { note, notes, modals, user, settings } from '$lib/stores';
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
			throw new Error(`Something wrong while getting notes`, err);
		}
	};

	const getSettings = async () => {
		try {
			const result = await api.settings.get({ user_uuid: $user.uuid });
			if (!result) return;

			const enableAutocomplete = result.find((setting) => setting.name === 'enableAutocomplete');
			const enableVim = result.find((setting) => setting.name === 'enableVim');
			const openAIKey = result.find((setting) => setting.name === 'openAIKey');

			settings.set({
				enableAutocomplete: enableAutocomplete?.value === 'true' ? true : false,
				enableVim: enableVim?.value === 'true' ? true : false,
				openAIKey: openAIKey?.value ? '**********************' : ''
			});

			if (!$settings.openAIKey) {
				$settings.enableAutocomplete = false;
				api.settings.update({
					setting: {
						name: 'enableAutocomplete',
						value: 'false'
					},
					user_uuid: $user.uuid
				});
			}
		} catch (err) {
			throw new Error(`Something wrong while getting settings`, err);
		}
	};

	onMount(async () => {
		try {
			$user = await api.users.get();

			await getSettings();
			await getNotes();
		} catch (err) {
			if (err.message.includes('401')) {
				goto('/auth');
			} else {
				$modals.sessionExpired = true;
			}
		}
	});
</script>

<div>
	<Topbar />
	<Sidebar />
	<Editor />
	<SessionExpired />
</div>
