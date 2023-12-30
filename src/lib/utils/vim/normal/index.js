import helpers from './helpers.js';

export default function normal({
	getEditableDiv,
	getMode,
	setMode,
	getLastKeyPressed,
	setLastKeyPressed
}) {
	const keydown = (event) => {
		const mode = getMode();
		const lastKeyPressed = getLastKeyPressed();
		if (mode !== 'normal') return;
		helpers.setEditableDiv(getEditableDiv());
		switch (event.key) {
			case 'h':
				helpers.moveCursorLeft();
				break;
			case 'j':
				helpers.moveCursorDown();
				break;
			case 'k':
				helpers.moveCursorUp();
				break;
			case 'l':
				helpers.moveCursorRight();
				break;
			case 'i':
				setMode('insert');
				break;
			case 'o':
				helpers.insertLine();
				setMode('insert');
				break;
			case 'v':
				setMode('visual');
				break;
			case 'w':
				helpers.moveCursorWordForward();
				break;

			case '0':
				helpers.moveToStart();
				break;

			case '$':
				helpers.moveToEnd();
				break;

			case 'b':
				helpers.moveCursorWordBackward();
				break;

			case 'G':
				helpers.moveCursorToEnd();
				break;

			case 'g':
				if (lastKeyPressed !== 'g') break;
				helpers.moveCursorToStart();
				break;

			case 'd':
				if (lastKeyPressed !== 'd') break;
				helpers.selectWholeLine();
				helpers.deleteSelection();
				break;

			case 'p':
				helpers.paste(event);
				break;

			case 'Escape':
				setMode('normal');
				break;

			default:
				break;
		}
		setLastKeyPressed(event.key);
		event.preventDefault();
	};
	return {
		keydown
	};
}
