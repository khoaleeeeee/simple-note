let editableDiv;
let mode;

const setEditableDiv = (div) => {
	editableDiv = div;
};

const setMode = (newMode) => {
	mode = newMode;
};

const modifySelection = (direction, unit) => {
	const selection = window.getSelection();
	if (!selection.isCollapsed || mode === 'visual') {
		selection.modify('extend', direction, unit);
	}
};

const stopSelection = (event) => {
	if (event.key === 'Escape') {
		const selection = window.getSelection();
		if (!selection.isCollapsed) {
			selection.collapseToStart();
		}
		event.preventDefault();
		return;
	}
};

const copyToClipboard = async () => {
	const selection = window.getSelection();
	const selectedText = selection.toString();
	if (selectedText) {
		try {
			await navigator.clipboard.writeText(selectedText);
			selection.collapseToStart();
			console.log('Text copied to clipboard');
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
};

const deleteSelection = () => {
	const selection = window.getSelection();
	if (!selection.isCollapsed) {
		document.execCommand('delete');
	}
};

const selectToStart = () => {
	const selection = window.getSelection();
	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		range.setStart(editableDiv, 0);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

const selectToEnd = () => {
	const selection = window.getSelection();
	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		range.setEnd(editableDiv, editableDiv.childNodes.length);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

const selectToStartOfLine = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	let range = selection.getRangeAt(0);
	let container = range.startContainer;

	// Traverse up to find the block-level parent (e.g., DIV, P)
	while (container.nodeType !== Node.ELEMENT_NODE) {
		container = container.parentNode;
	}

	// Extend the selection to the start of this container
	range.setStart(container, 0);
	selection.removeAllRanges();
	selection.addRange(range);
};

const selectToEndOfLine = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	let range = selection.getRangeAt(0);
	let container = range.startContainer;

	// Traverse up to find the block-level parent (e.g., DIV, P)
	while (container.nodeType !== Node.ELEMENT_NODE) {
		container = container.parentNode;
	}

	// Extend the selection to the end of this container
	range.setEnd(container, container.childNodes.length);
	selection.removeAllRanges();
	selection.addRange(range);
};

export default {
	modifySelection,
	stopSelection,
	copyToClipboard,
	deleteSelection,
	selectToStart,
	selectToEnd,
	selectToStartOfLine,
	selectToEndOfLine,
	setEditableDiv,
	setMode
};
