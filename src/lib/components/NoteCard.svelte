<script>
	import stores from '$lib/stores';
	import api from '$lib/api';
	export let note;

	function truncateContent(content, maxLength = 30) {
		return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
	}

	function formatDate(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	const onDelete = async () => {
		stores.notes.update((notes) => notes.filter((n) => n.uuid !== note.uuid));
		stores.note.set(stores.notes[0]);
		await api.notes.remove(note);
	};
</script>

<div
	class="relative p-2 min-h-32 min-w-full border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer hover:text-gray-800 hover:bg-gray-200"
>
	<button
		class="absolute font-bold top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
		on:click={onDelete}
	>
		x
	</button>
	<h2 class="font-bold text-lg text-gray-800">{note.title}</h2>
	<p class="text-sm text-gray-600 mt-2">{truncateContent(note.content)}</p>
	<p class="text-xs text-gray-500 mt-4">{formatDate(note.modified_at)}</p>
</div>
