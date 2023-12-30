import saveNote from './saveNote';
import debounce from './debounce';
import getCurrentText from './getCurrentText';
import createVim from './vim';
import createAutocomplete from './autocomplete';

export default {
	createVim,
	saveNote,
	debounce,
	createAutocomplete,
	getCurrentText
};
export { saveNote, debounce, getCurrentText };
