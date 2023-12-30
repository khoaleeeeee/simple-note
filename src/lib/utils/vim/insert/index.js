export default function insert({ setMode }) {
	const keydown = (event) => {
		if (event.key === 'Escape') {
			document.dispatchEvent(new CustomEvent('removeSuggestion'));
			setMode('normal');
			event.preventDefault();
		}
	};

	return {
		keydown
	};
}
