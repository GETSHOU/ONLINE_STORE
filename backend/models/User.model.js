const mongoose = require("mongoose");
const { ROLES } = require("../constants/roles");

// благодаря timestamps, mongoose будет добавлять каждому документу поля 'created_at' и 'updated_at', где будут храниться даты создания и редактирования этого документа
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
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
	User,
};
