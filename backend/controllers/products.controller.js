const Product = require("../models/Product.model");
const Subcategory = require("../models/Subcategory.model");
const { mapProduct } = require("../helpers");

const productsController = {
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
	update: async (productId, valueToUpdate, res) => {
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{ $set: valueToUpdate },
			{
				returnDocument: "after",
			}
		);

		res.send({ data: mapProduct(updatedProduct) });

		return updatedProduct;
	},
	delete: async (productId, res) => {
		try {
			await Product.deleteOne({ _id: productId });

			res.send({ error: null });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	getSortedProducts: async (subcategoryId, sortField, res) => {
		try {
			const sortedProducts = await Product.find({ parent: subcategoryId }).sort(
				sortField
			);

			res.send({ data: sortedProducts.map(mapProduct) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	getAllFromSubcategory: async (subcategoryId, res) => {
		try {
			const products = await Product.find({ parent: subcategoryId }).populate(
				"parent"
			);

			res.send({ data: products.map(mapProduct) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = productsController;
