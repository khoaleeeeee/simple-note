<script>
	import api from '$lib/api';
	import stores from '$lib/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const get = async ({ url }) => {
		// Extract the authorization code from the query parameters
		const code = url.searchParams.get('code');

		if (!code) {
			return { status: 400, body: 'Authorization code is missing' };
		}

		try {
			const user = await exchangeToken(code);

			localStorage.setItem('user_uuid', user.uuid);
			stores.user.set(user);

			goto('/');

			return { status: 200, body: user };
		} catch (error) {
			console.error('Error exchanging code for tokens', error);
			return { status: 500, body: 'Internal Server Error' };
		}
	};

	const exchangeToken = async (code) => {
		return api.auth.google.get({ code });
	};

	onMount(() => {
		get({ url: new URL(window.location) });
	});
</script>
