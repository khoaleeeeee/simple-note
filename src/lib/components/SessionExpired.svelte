<script>
	import { Modal } from 'flowbite-svelte';
	import modals from '$lib/stores/modals';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<Modal
	title="Session Expired"
	bind:open={$modals.sessionExpired}
	size="sm"
	dismissable={false}
	outsideclose
>
	<div class="p-2 flex flex-col justify-center items-center">
		<p class="text-lg text-gray-500 dark:text-gray-400">
			Your session has expired. Please login again.
		</p>

		<div class="mt-3">
			<Button
				on:click={() => {
					modals.set({ ...modals, sessionExpired: false });
					goto('/auth');
				}}
			>
				Login
			</Button>
		</div>
	</div></Modal
>
