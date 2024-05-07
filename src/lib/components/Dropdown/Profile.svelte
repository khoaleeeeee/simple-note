<script>
	import modals from '$lib/stores/modals';
	import user from '$lib/stores/user';
	import { Label, Input, Modal, Avatar } from 'flowbite-svelte';
	import { EnvelopeSolid, UserSolid } from 'flowbite-svelte-icons';
	import Button from '$lib/components/Button.svelte';
</script>

<Modal title="Profile" bind:open={$modals.profile} outsideclose>
	<div class="p-4 flex flex-col justify-center items-center">
		<Avatar size="lg" src={$user.picture} dot={{ placement: 'bottom-right', color: 'green' }} />

		<div class="mb-6">
			<Label for="input-group-1" class="block mb-2 text-gray-500 font-semibold">Name</Label>
			<Input
				id="email"
				type="email"
				placeholder={$user.name}
				defaultClass="block w-full disabled:cursor-not-allowed rtl:text-right"
				disabled
			>
				<UserSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
			</Input>
		</div>

		<div class="mb-6">
			<Label for="input-group-1" class="block mb-2 text-gray-500 font-semibold">Email</Label>
			<Input
				id="email"
				type="email"
				placeholder={$user.email}
				defaultClass="block w-full disabled:cursor-not-allowed rtl:text-right"
				disabled
			>
				<EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
			</Input>
		</div>
	</div>

	<svelte:fragment slot="footer">
		<Button
			on:click={() => {
				modals.set({ ...modals, profile: false });
			}}>Done</Button
		>
	</svelte:fragment>
</Modal>
