export const getTotalPriceProducts = data => {
	return data.reduce((acc, item) => {
		const price = item.product.price;
		const count = item.productCount;

		return acc + price * count;
	}, 0);
};
