const Product = require("../models/Product.model");
const Subcategory = require("../models/Subcategory.model");
const { mapProduct } = require("../helpers");

const productsController = {
	create: async (subcategoryId, product, res) => {
		try {
			const newProduct = await Product.create({
				parent: subcategoryId,
				...product,
			});

			await Subcategory.findByIdAndUpdate(subcategoryId, {
				$push: { products: newProduct },
			});

			await newProduct.populate("parent");

			res.send({ data: mapProduct(newProduct) });

			return newProduct;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	getAll: async (subcategoryId, res) => {
		try {
			const products = await Product.find({ parent: subcategoryId }).populate(
				"parent"
			);

			res.send({ data: products.map(mapProduct) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	getOne: async (productId, res) => {
		try {
			const product = await Product.findById(productId).populate({
				path: "comments",
				populate: "author",
			});

			res.send({ data: mapProduct(product) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = productsController;
