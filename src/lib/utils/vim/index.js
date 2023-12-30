import createInsert from './insert';
import createNormal from './normal';
import createVisual from './visual';

export default function vim({ editableDiv }) {
	let mode = 'normal';
	let lastKeyPressed;

	const setEditableDiv = (newEditableDiv) => {
		editableDiv = newEditableDiv;
	};

	const getEditableDiv = () => editableDiv;

	const setMode = (newMode) => {
		mode = newMode;
	};

	const getMode = () => mode;

	const setLastKeyPressed = (key) => {
		lastKeyPressed = key;
	};

	const getLastKeyPressed = () => lastKeyPressed;

	const insert = createInsert({ setMode });
	const normal = createNormal({
		getEditableDiv,
		getMode,
		setMode,
		getLastKeyPressed,
		setLastKeyPressed
	});
	const visual = createVisual({
		getEditableDiv,
		getMode,
		setMode,
		getLastKeyPressed,
		setLastKeyPressed
	});

	const keydown = (event) => {
		if (mode === 'insert') {
			insert.keydown(event);
		} else if (mode === 'normal') {
			normal.keydown(event);
		} else if (mode === 'visual') {
			visual.keydown(event);
		}
	};
	return {
		setEditableDiv,
		getMode: () => mode,
		keydown
	};
}
