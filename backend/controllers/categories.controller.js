const Category = require("../models/Category.model");
const { mapCategory } = require("../helpers");

const categoriesController = {
	create: async (title, res) => {
		try {
			const newCategory = await Category.create({
				title,
			});

			await newCategory.populate({
				path: "subcategories",
				populate: "parent",
			});

			res.send({ data: mapCategory(newCategory) });

			return newCategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	get: async (res) => {
		try {
			const categories = await Category.find();

			res.send({ data: categories.map(mapCategory) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = categoriesController;
