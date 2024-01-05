const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				product_count: {
					type: Number,
					required: true,
				},
			},
		],
		total_price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
