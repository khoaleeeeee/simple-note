let editableDiv;

const setEditableDiv = (div) => {
	editableDiv = div;
};

const moveCursorLeft = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		selection.modify('move', 'backward', 'character');
	}
};

const moveCursorDown = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		selection.modify('move', 'forward', 'line');
	}
};

const moveCursorUp = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		selection.modify('move', 'backward', 'line');
	}
};

const moveCursorRight = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		selection.modify('move', 'forward', 'character');
	}
};

const paste = async (event) => {
	try {
		const text = await navigator.clipboard.readText();
		document.execCommand('insertText', false, text);
		event.preventDefault();
	} catch (err) {
		console.error('Failed to read from clipboard:', err);
	}
};

const moveCursorWordForward = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		const range = selection.getRangeAt(0);
		const textContent = range.startContainer.textContent;
		const isAtWordBoundary = /\W/.test(textContent[range.startOffset]);
		const wordBoundaryRegex = /\W\w/;

		let wordBoundaryIndex = textContent.substring(range.startOffset).search(wordBoundaryRegex);
		if (wordBoundaryIndex === -1 && !isAtWordBoundary) {
			selection.modify('move', 'forward', 'word');
			return;
		}
		wordBoundaryIndex += range.startOffset + 1; // Adjust index because we started searching from range.startOffset

		range.setStart(range.startContainer, wordBoundaryIndex);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

const moveCursorWordBackward = () => {
	const selection = window.getSelection();
	if (selection.isCollapsed) {
		const range = selection.getRangeAt(0);
		const textContent = range.startContainer.textContent;
		const reverseTextContent = textContent
			.substring(0, range.startOffset)
			.split('')
			.reverse()
			.join('');
		const reverseWordBoundaryRegex = /\w\W/;

		let wordBoundaryIndex = reverseTextContent.search(reverseWordBoundaryRegex);
		if (wordBoundaryIndex === -1) {
			selection.modify('move', 'backward', 'word');
			return;
		}
		wordBoundaryIndex = range.startOffset - (wordBoundaryIndex + 1); // Adjust index because we searched in the reversed string

		range.setStart(range.startContainer, wordBoundaryIndex);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

const selectWholeLine = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	let range = selection.getRangeAt(0).cloneRange();
	let startContainer = range.startContainer;

	// If the start container is a text node and appears empty (or just whitespace)
	if (startContainer.nodeType === Node.TEXT_NODE && !/\S/.test(startContainer.textContent)) {
		// If the text node contains a single invisible character (like a non-breaking space)
		if (startContainer.textContent.length === 1) {
			range.selectNode(startContainer);
		} else {
			// Extend the selection to the whole line
			range.setStart(startContainer, 0);
			range.setEnd(startContainer, startContainer.textContent.length);
		}
	} else {
		// If the line isn't empty, adjust the range to select the whole line
		while (
			range.startOffset > 0 &&
			!isLineBreak(range.startContainer.textContent[range.startOffset - 1])
		) {
			range.setStart(range.startContainer, range.startOffset - 1);
		}

		while (
			range.endOffset < range.endContainer.textContent.length &&
			!isLineBreak(range.endContainer.textContent[range.endOffset])
		) {
			range.setEnd(range.endContainer, range.endOffset + 1);
		}
	}

	selection.removeAllRanges();
	selection.addRange(range);
};

const isLineBreak = (char) => {
	// Assuming lines are separated by newline characters
	return char === '\n';
};

const moveCursorToStart = () => {
	const selection = window.getSelection();
	const range = document.createRange();
	range.selectNodeContents(editableDiv);
	range.collapse(true); // Collapse range to the start
	selection.removeAllRanges();
	selection.addRange(range);
};

const moveCursorToEnd = () => {
	const selection = window.getSelection();
	const range = document.createRange();
	range.selectNodeContents(editableDiv);
	range.collapse(false); // Collapse range to the end
	selection.removeAllRanges();
	selection.addRange(range);
};

const insertLine = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	// Get the current range and its container
	const range = selection.getRangeAt(0);
	let currentContainer = range.startContainer;

	// Create a new line element (e.g., 'div' with a 'br' for visual separation)
	const newLine = document.createElement('div');
	newLine.appendChild(document.createElement('br'));

	// Insert the new line after the current container
	currentContainer.parentNode.insertBefore(newLine, currentContainer.nextSibling);
	range.setStart(newLine, 0);
	range.collapse(true);
	selection.removeAllRanges();
	selection.addRange(range);
};

const moveToStart = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	let range = selection.getRangeAt(0);
	let container = range.startContainer;

	// If the container is a text node, move to the start of this node
	if (container.nodeType === Node.TEXT_NODE) {
		range.setStart(container, 0);
	} else if (container.nodeType === Node.ELEMENT_NODE) {
		// If the container is an element node, move to the first child node
		if (container.firstChild) {
			range.setStart(container.firstChild, 0);
		}
	}

	range.collapse(true);
	selection.removeAllRanges();
	selection.addRange(range);
};

const moveToEnd = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;
	let range = selection.getRangeAt(0);
	let container = range.startContainer;

	// If the container is a text node, move to the end of this node
	if (container.nodeType === Node.TEXT_NODE) {
		range.setEnd(container, container.textContent.length);
	} else if (container.nodeType === Node.ELEMENT_NODE) {
		// If the container is an element node, move to the last child node
		if (container.lastChild) {
			range.setEnd(container.lastChild, container.lastChild.textContent.length);
		}
	}

	range.collapse(false);
	selection.removeAllRanges();
	selection.addRange(range);
};

const deleteSelection = () => {
	const selection = window.getSelection();
	if (!selection.isCollapsed) {
		document.execCommand('delete');
	}
};

export default {
	moveCursorWordForward,
	moveCursorWordBackward,
	selectWholeLine,
	moveCursorToStart,
	moveCursorToEnd,
	insertLine,
	moveToStart,
	moveToEnd,
	moveCursorUp,
	moveCursorDown,
	moveCursorLeft,
	moveCursorRight,
	paste,
	setEditableDiv,
	deleteSelection
};
