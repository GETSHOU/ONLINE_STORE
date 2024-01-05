const mongoose = require("mongoose");
const mapProduct = require("./mapProduct");

module.exports = function (order) {
	return {
		id: order._id,
		products: order.products.map((order) => {
			return {
				product: mongoose.isObjectIdOrHexString(order.product)
					? order.product
					: mapProduct(order.product),
				productCount: order.product_count,
			};
		}),
		totalPrice: order.total_price,
		orderedAt: order.createdAt,
	};
};
