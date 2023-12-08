export const getSectionTitle = section => {
	const parentTitles = section.map(({ parent }) => parent);

	let parentTitle = parentTitles.reduce((result, item) => {
		return result.includes(item) ? result.join() : [...result, item];
	}, []);

	return parentTitle;
};
