const Category = require("../models/Category.model");
const Subcategory = require("../models/Subcategory.model");
const { mapSubcategory } = require("../helpers");

const subcategoriesController = {
	create: async (categoryId, title, res) => {
		try {
			const newSubcategory = await Subcategory.create({
				parent: categoryId,
				title,
			});

			await Category.findByIdAndUpdate(categoryId, {
				$push: { subcategories: newSubcategory },
			});

			await newSubcategory.populate("parent");

			res.send({ data: mapSubcategory(newSubcategory) });

			return newSubcategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	get: async (categoryId, res) => {
		try {
			const subcategories = await Subcategory.find({ parent: categoryId });

			res.send({ data: subcategories.map(mapSubcategory) });

			return subcategories;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = subcategoriesController;
