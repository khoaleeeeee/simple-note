<script>
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { UserSettingsSolid, CogSolid, LockOpenSolid } from 'flowbite-svelte-icons';
	import user from '$lib/stores/user';
	import modals from '$lib/stores/modals';
	import Settings from './Settings.svelte';
	import Profile from './Profile.svelte';
	import api from '$lib/api';

	const onSignOut = async () => {
		const res = await api.signout();
		if (res.status !== 200) console.log('Error while signing out');
		user.set({});
		window.location.href = '/auth';
	};

	const onSettingsClick = () => {
		modals.set({ ...modals, settings: true });
	};

	const onProfileClick = () => {
		modals.set({ ...modals, profile: true });
	};
</script>

<div class="z-60">
	<Settings />
	<Profile />
	<Avatar id="user-drop" src={$user.picture} class="cursor-pointer" />

	{#if $user.name && $user.email}
		<Dropdown triggeredBy="#user-drop" class="p-0">
			<DropdownHeader>
				<span class="block text-sm">{$user.name}</span>
				<span class="block truncate text-sm font-medium">{$user.email}</span>
			</DropdownHeader>
			<DropdownItem on:click={onProfileClick}>
				<div class="flex">
					<UserSettingsSolid class="w-5 h-5 mr-2" />
					<span>Profile</span>
				</div>
			</DropdownItem>
			<DropdownItem on:click={onSettingsClick}>
				<div class="flex">
					<CogSolid class="w-5 h-5 mr-2" />
					<span>Settings</span>
				</div></DropdownItem
			>
			<DropdownDivider />
			<DropdownItem
				defaultClass="font-medium py-3 px-4 text-sm hover:bg-rose-500 dark:hover:bg-rose-500 rounded-b-lg"
				on:click={onSignOut}
			>
				<div class="flex">
					<LockOpenSolid class="w-5 h-5 mr-2" />
					<span>Sign Out</span>
				</div></DropdownItem
			>
		</Dropdown>
	{/if}
</div>
