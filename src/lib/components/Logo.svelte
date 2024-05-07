<script>
	import Logo from '$lib/logo/Logo.png';
	import LogoDark from '$lib/logo/LogoDark.png';

	import { onMount, onDestroy } from 'svelte';

	$: logo = null;

	onMount(() => {
		let theme = localStorage.getItem('color-theme');

		logo = theme === 'dark' ? LogoDark : Logo;

		document.addEventListener('theme-changed', onThemeChange);
	});

	const onThemeChange = () => {
		let theme = localStorage.getItem('color-theme');
		logo = theme === 'dark' ? LogoDark : Logo;
	};
</script>

<img src={logo} class="me-3 h-6 sm:h-9" alt="NoteHub Logo" />
