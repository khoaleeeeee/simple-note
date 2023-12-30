const getCurrentText = (text) => {
	// Split the text into words
	const words = text.split(/\s+/);
	// Get the last 100 words, or fewer if there aren't enough
	const last100Words = words.slice(Math.max(words.length - 100, 0));
	// Join the words back into a string
	return last100Words.join(' ');
};

export default getCurrentText;
