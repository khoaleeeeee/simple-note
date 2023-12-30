import api from '$lib/api';
import debounce from './debounce';
import getCurrentText from './getCurrentText';

export default function autocomplete({ editableDiv }) {
	let suggestionElement;

	const removeSuggestion = () => {
		if (suggestionElement) {
			suggestionElement.remove();
			suggestionElement = null;
		}
		document.removeEventListener('removeSuggestion', removeSuggestion);
	};

	const setEditableDiv = (newEditableDiv) => {
		editableDiv = newEditableDiv;
	};

	const fetchSuggestion = debounce(async (content) => {
		const lastSentence = getCurrentText(content);
		const suggestion = await api.autocomplete(lastSentence);

		// Create the suggestion element
		suggestionElement = document.createElement('span');
		// add id
		suggestionElement.id = 'suggestion';
		suggestionElement.textContent = suggestion;
		suggestionElement.style.color = 'grey'; // Grey out the text
		suggestionElement.style.pointerEvents = 'none'; // Prevent interaction with the suggestion

		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.deleteContents(); // Remove current selection

			// Insert the suggestion at the cursor position
			range.insertNode(suggestionElement);

			// Place the cursor right before the suggestion
			range.setStartBefore(suggestionElement);
			range.setEndBefore(suggestionElement);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}, 1000);

	const acceptSuggestion = (func) => {
		suggestionElement = editableDiv.querySelector('#suggestion');
		if (suggestionElement) {
			// Replace the suggestion span with its text content
			const textNode = document.createTextNode(suggestionElement.textContent);
			suggestionElement.parentNode.replaceChild(textNode, suggestionElement);

			// Update the cursor position to be at the end of the inserted text
			const range = document.createRange();
			const selection = window.getSelection();
			range.setStartAfter(textNode);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);

			// Update your content store or variable
			func(textNode.textContent);
		}
	};

	const denySuggestion = () => {
		suggestionElement = editableDiv.querySelector('#suggestion');
		if (suggestionElement) {
			const range = document.createRange();
			const selection = window.getSelection();

			// Calculate the position before the suggestion element
			range.setStart(editableDiv, 0); // Start from the beginning of editableDiv
			range.setEndBefore(suggestionElement); // End right before the suggestionElement

			// Remove the suggestion span
			suggestionElement.remove();

			// Set the selection range to the calculated position
			selection.removeAllRanges();
			selection.addRange(range);

			// Move the cursor to the end of the range
			selection.collapseToEnd();
		}
	};

	const keydown = (event, func) => {
		// Create a regex to match the suggestion with potential surrounding spaces
		if (event.key === 'Tab' && suggestionElement) {
			event.preventDefault();
			acceptSuggestion(func);
		} else if (suggestionElement) {
			denySuggestion();
		}
	};
	return {
		removeSuggestion,
		keydown,
		fetchSuggestion,
		setEditableDiv
	};
}
