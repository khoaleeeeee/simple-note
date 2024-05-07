<script>
	import Switch from '$lib/components/Switch.svelte';
	import { Modal } from 'flowbite-svelte';
	import modals from '$lib/stores/modals';
	import settings from '$lib/stores/settings';
	import user from '$lib/stores/user';
	import api from '$lib/api';
	import { Label } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let openAIKey = '';

	const settingsUnsubscribe = settings.subscribe((value) => {
		openAIKey = value.openAIKey || '';
	});

	onDestroy(() => {
		settingsUnsubscribe();
	});

	let toggleError = {
		enableVim: false,
		enableAutocomplete: false
	};
	let toggleSuccess = {
		enableVim: false,
		enableAutocomplete: false
	};

	const onAPIKeySave = async () => {
		$settings.openAIKey = openAIKey;

		await api.settings.update({
			setting: {
				name: 'openAIKey',
				value: openAIKey
			},
			user_uuid: $user.uuid
		});

		toggleSuccess.enableAutocomplete = true;
	};

	const onAPIKeyUse = async () => {
		$settings.openAIKey = openAIKey;
		toggleSuccess.enableAutocomplete = true;
	};

	const onChange = async (event) => {
		switch (event.detail.id) {
			case 'enableVim':
				await api.settings.update({
					setting: {
						name: 'enableVim',
						value: $settings.enableVim.toString()
					},
					user_uuid: $user.uuid
				});
				break;
			case 'enableAutocomplete':
				if ($settings.openAIKey === '') {
					toggleError.enableAutocomplete = true;
					$settings.enableAutocomplete = false;
					return;
				}
				await api.settings.update({
					setting: {
						name: 'enableAutocomplete',
						value: $settings.enableAutocomplete.toString()
					},
					user_uuid: $user.uuid
				});
				break;
		}
	};
</script>

<Modal title="Settings" bind:open={$modals.settings} outsideclose>
	<div class="flex flex-col gap-5 text-gray-500 font-semibold">
		<span class="">Vim (Not supported on mobile)</span>

		<div class="flex items-center gap-2 ml-5">
			<span>{$settings.enableVim ? 'On' : 'Off'}</span>
			<Switch id={'enableVim'} bind:checked={$settings.enableVim} on:change={onChange} />
		</div>

		<div class="text-gray-600 text-xs font-thin ml-5">Enable vim mode for the editor</div>
	</div>

	<div class="flex flex-col gap-5 text-gray-500 font-semibold">
		<span class="">AutoComplete (Beta)</span>

		<div class="flex items-center gap-2 ml-5">
			<span>{$settings.enableAutocomplete ? 'On' : 'Off'}</span>
			<Switch
				id="enableAutocomplete"
				bind:checked={$settings.enableAutocomplete}
				on:change={onChange}
			/>

			{#if toggleError.enableAutocomplete && $settings.openAIKey === ''}
				<div class="text-red-500 text-xs font-thin">
					Provide your OpenAI API Key for this function
				</div>
			{/if}
		</div>
	</div>

	<div class="mb-6 ml-5">
		<Label for="default-input" class="block mb-2">OpenAI API Key</Label>
		<div class="flex gap-2">
			<input
				type="text"
				id="default-input"
				class="bg-primary-input w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none transition-colors duration-200 ease-in-out"
				placeholder="Enter key"
				bind:value={openAIKey}
				disabled={$settings.enableAutocomplete}
			/>

			<Button on:click={onAPIKeyUse} disabled={$settings.enableAutocomplete}>Use</Button>
			<Button on:click={onAPIKeySave} disabled={$settings.enableAutocomplete}>Save</Button>
		</div>
		<div class="text-gray-600 text-xs font-thin mt-5">
			*Use: Your API key will not be saved on our database. It is only available for the current
			session.
		</div>
		<div class="text-gray-600 text-xs font-thin">
			*Save: Your API key will be encrypted and saved on our database.
		</div>
		{#if toggleSuccess.enableAutocomplete}
			<div class="text-green-500 font-thin">API Key saved!</div>
		{/if}
	</div>

	<svelte:fragment slot="footer">
		<Button
			on:click={() => {
				modals.set({ ...modals, settings: false });
			}}>Done</Button
		>
	</svelte:fragment>
</Modal>

<style>
	.bg-primary-input:disabled {
		background-color: #e5e5e5; /* Light grey background */
		color: #999999; /* Dimmed text color */
		cursor: not-allowed; /* Cursor to indicate non-interactive element */
	}
</style>
