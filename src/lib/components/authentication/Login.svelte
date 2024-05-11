<script>
	import { Card } from 'flowbite-svelte';
	import Google from './Google.svelte';
	import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';

	let titleTypeDone = false;
	let introTypeDone = false;
</script>

<div class="flex flex-col items-center min-h-screen mt-[20vh]">
	<div class="m-10 items-start">
		<Typewriter
			mode="loopOnce"
			interval="30"
			on:done={() => {
				titleTypeDone = true;
			}}
		>
			<h1 class="text-4xl font-bold font-mono text-gray-900 dark:text-white">
				Welcome to NoteHub!
			</h1>
		</Typewriter>
		{#if titleTypeDone}
			<Typewriter
				interval="10"
				on:done={() => {
					introTypeDone = true;
				}}
			>
				<h3 class="text-xl font-semibold font-mono text-gray-900 dark:text-white">
					Let's get started by signing you in.
				</h3>
			</Typewriter>
		{/if}
	</div>

	{#if introTypeDone}
		<div transition:fly={{ delay: 250, duration: 100 }}>
			<Card class="transition-transform transform hover:scale-105">
				<form class="flex flex-col space-y-6" action="/">
					<h3 class="text-xl font-semibold font-mono text-gray-900 dark:text-white">
						Sign in with Google
					</h3>
					<Google />
					<span class="text-xs text-gray-600 dark:text-gray-400">
						*More sign-in options coming soon!
					</span>
				</form>
			</Card>
		</div>
	{/if}
</div>
