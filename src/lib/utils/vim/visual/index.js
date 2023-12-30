import helpers from './helpers.js';

export default function visual({
	getEditableDiv,
	getMode,
	setMode,
	getLastKeyPressed,
	setLastKeyPressed
}) {
	const keydown = (event) => {
		const mode = getMode();
		const lastKeyPressed = getLastKeyPressed();
		helpers.setEditableDiv(getEditableDiv());
		helpers.setMode(mode);
		if (mode !== 'visual') return;
		switch (event.key) {
			case 'Escape':
				helpers.stopSelection(event);
				setMode('normal');
				break;
			case 'y':
				helpers.copyToClipboard();
				setMode('normal');
				break;
			case 'd':
				helpers.deleteSelection();
				setMode('normal');
				break;
			case 'h':
				helpers.modifySelection('backward', 'character');
				break;
			case 'j':
				helpers.modifySelection('forward', 'line');
				break;
			case 'k':
				helpers.modifySelection('backward', 'line');
				break;
			case 'l':
				helpers.modifySelection('forward', 'character');
				break;
			case 'w':
				helpers.modifySelection('forward', 'word');
				break;
			case 'b':
				helpers.modifySelection('backward', 'word');
				break;
			case 'g':
				if (lastKeyPressed !== 'g') break;
				helpers.selectToStart();
				break;
			case 'G':
				helpers.selectToEnd();
				break;
			case '0':
				helpers.selectToStartOfLine();
				break;
			case '$':
				helpers.selectToEndOfLine();
				break;
		}
		setLastKeyPressed(event.key);
		event.preventDefault();
	};
	return {
		keydown
	};
}
