const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema({
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subcategory",
	},
	title: {
		type: String,
		required: true,
	},
	vendor: {
		type: String,
		required: true,
	},
	vendorCode: {
		type: String,
		required: true,
	},
	specs: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	previewImage: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: "URL-адрес изображения невалиден",
		},
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
