const mongoose = require("mongoose");
const mapProduct = require("./mapProduct");

module.exports = function (user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		roleId: user.role,
		basket: user.basket.map((item) => {
			return {
				product: mongoose.isObjectIdOrHexString(item.product)
					? item.product
					: mapProduct(item.product),
				productCount: item.product_count,
			};
		}),
		registeredAt: user.createdAt,
	};
};
