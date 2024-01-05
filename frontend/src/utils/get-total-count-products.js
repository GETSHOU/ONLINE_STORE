export const getTotalCountProducts = data => {
	return data.reduce((acc, item) => {
		const count = item.productCount;

		return acc + count;
	}, 0);
};
