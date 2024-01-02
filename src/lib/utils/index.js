import saveNote from './saveNote';
import debounce from './debounce';
import getCurrentText from './getCurrentText';
import createVim from './vim';
import createAutocomplete from './autocomplete';
import delta from './delta';

export default {
	delta,
	createVim,
	saveNote,
	debounce,
	createAutocomplete,
	getCurrentText
};
export { delta, saveNote, debounce, getCurrentText };
