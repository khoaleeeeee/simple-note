<script>
	import { onMount, onDestroy } from 'svelte';
	import sidebar from '$lib/stores/sidebar';
	import { size, language } from '$lib/stores';

	$: open = $sidebar.expanded;

	let editorContainer;
	let editor;
	let monaco;

	$: if (editor && $language) {
		editor.setValue('');
		monaco.editor.setModelLanguage(editor.getModel(), $language.toLowerCase());
	}

	$: if (editor && $size) {
		editor.updateOptions({
			fontSize: $size
		});
	}

	onMount(async () => {
		monaco = await import('monaco-editor');
		editor = monaco.editor.create(editorContainer, {
			value: '',
			language: $language.toLowerCase(),
			fontSize: $size,
			padding: {
				top: 10,
				bottom: 10
			}
		});

		monaco.editor.setTheme('vs-dark');

		return () => {
			if (editor) {
				editor.dispose();
			}
		};
	});
	let title = '';
</script>

<div class="flex flex-col items-center justify-center h-full" class:open>
	<div class="w-full h-full max-w-6xl bg-white shadow-lg rounded">
		<input
			bind:value={title}
			class="w-full p-4 shadow-sm bg-vs-dark text-2xl font-bold font-mono"
			placeholder="Title"
		/>
		<div bind:this={editorContainer} class="editor" />
	</div>
</div>

<style>
	.editor {
		height: 100vh;
	}
	.flex {
		margin-left: 0;
		transition: margin-left 0.3s ease-in-out;
	}
	.open {
		margin-left: 25%;
		transition: 0.3s ease-in-out;
	}
</style>
