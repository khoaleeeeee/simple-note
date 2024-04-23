<script>
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import user from '$lib/stores/user';
</script>

<Avatar id="user-drop" src={$user.picture} class="cursor-pointer" />

{#if $user.name && $user.email}
	<Dropdown triggeredBy="#user-drop">
		<DropdownHeader>
			<span class="block text-sm">{$user.name}</span>
			<span class="block truncate text-sm font-medium">{$user.email}</span>
		</DropdownHeader>
		<DropdownItem>Profile</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownDivider />
		<DropdownItem
			defaultClass="font-medium py-2 px-4 text-sm hover:bg-rose-500 dark:hover:bg-rose-500"
			>Sign out</DropdownItem
		>
	</Dropdown>
{/if}
