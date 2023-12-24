const User = require("../models/User.model");
const Product = require("../models/Product.model");
const { mapUser } = require("../helpers");

const getCountProducts = async (userId, productId) => {
	return await User.countDocuments({
		_id: userId,
		"basket.product": productId,
	});
};

const getProductIndex = (user, productId) => {
	return user.basket.findIndex((item) => item.product._id.equals(productId));
};

const addProduct = async (userId, productId) => {
	const addedProduct = await Product.findById(productId); // добавить .populate("parent") если понадобится имя подкатегории, где находится найденный товар

	return await User.findByIdAndUpdate(
		userId,
		{
			$push: {
				basket: {
					product: addedProduct,
					product_count: 1,
				},
			},
		},
		{ returnDocument: "after" }
	);
};

const deleteProduct = async (userId, productId) => {
	return await User.findByIdAndUpdate(userId, {
		$pull: {
			basket: {
				product: productId,
			},
		},
	});
};

const changeProductsCount = async (userId, productId, action) => {
	if (!action) {
		return;
	} else {
		await User.updateOne(
			{ _id: userId, "basket.product": productId },
			{
				$inc: {
					"basket.$.product_count":
						action === "increase" ? 1 : action === "decrease" ? -1 : false,
				},
			},
			{ returnDocument: "after" }
		);
	}
};

const increaseCountProducts = async (userId, productId) => {
	const user = await User.findById(userId);

	const productIndex = getProductIndex(user, productId);

	if (user.basket[productIndex].product_count >= 1) {
		await changeProductsCount(userId, productId, "increase");
	} else {
		return;
	}
};

const decreaseCountProducts = async (userId, productId) => {
	const user = await User.findById(userId);

	const productIndex = getProductIndex(user, productId);

	if (user.basket[productIndex].product_count > 1) {
		await changeProductsCount(userId, productId, "decrease");
	} else {
		await deleteProduct(userId, productId);
	}
};

const basketController = {
	get: async (userId, res) => {
		try {
			const user = await User.findById(userId).populate({
				path: "basket",
				populate: {
					path: "product",
				},
			});

			res.send({ data: mapUser(user).basket });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	increase: async (userId, productId, res) => {
		try {
			await increaseCountProducts(userId, productId);

			const updatedUser = await User.findById(userId);

			res.send({ data: mapUser(updatedUser) });
		} catch (error) {
			res.send({ error: e.message });
		}
	},
	decrease: async (userId, productId, res) => {
		try {
			await decreaseCountProducts(userId, productId);

			const updatedUser = await User.findById(userId);

			res.send({ data: mapUser(updatedUser) });
		} catch (error) {
			res.send({ error: e.message });
		}
	},
	add: async (userId, productId, res) => {
		try {
			const countProducts = await getCountProducts(userId, productId);
			const productExists = countProducts > 0;

			if (!productExists) {
				await addProduct(userId, productId);
			} else {
				await changeProductsCount(userId, productId, "increase");
			}

			const updatedUser = await User.findById(userId);

			res.send({ data: mapUser(updatedUser) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	delete: async (userId, productId, res) => {
		try {
			await deleteProduct(userId, productId);

			res.send({ error: null });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = basketController;
