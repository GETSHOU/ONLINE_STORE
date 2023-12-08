const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (product) {
	return {
		id: product._id,
		parent: product.parent.title,
		title: product.title,
		vendor: product.vendor,
		vendorCode: product.vendorCode,
		specs: product.specs,
		price: product.price,
		previewImageUrl: product.previewImage,
		comments: product.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
		),
	};
};
