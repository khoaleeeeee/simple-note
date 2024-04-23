const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		return new Promise((resolve, reject) => {
			const later = () => {
				clearTimeout(timeout);
				try {
					resolve(func.apply(this, args));
				} catch (e) {
					reject(e);
				}
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		});
	};
};

export default debounce;
