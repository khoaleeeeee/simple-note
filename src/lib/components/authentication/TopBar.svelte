<script>
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import DarkMode from '$lib/components/DarkMode.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="z-50 sticky w-full top-0 p-5">
	<Navbar rounded color="form">
		<NavBrand>
			<Logo />
		</NavBrand>
		<DarkMode />
	</Navbar>
</div>
