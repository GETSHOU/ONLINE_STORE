export const getParentCategoryTitle = data => {
	const parentTitlesData = data.map(({ parent }) => parent);
	const parentTitle = parentTitlesData.filter((item, index, array) => {
		return array.indexOf(item) === index;
	});

	return parentTitle.join("");
};
