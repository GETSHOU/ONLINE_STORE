const mongoose = require("mongoose");
const { ROLES } = require("../constants/roles");

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: ROLES.USER,
		},
		basket: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				product_count: {
					type: Number,
					default: 0,
				},
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
