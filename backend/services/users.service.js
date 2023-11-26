const {
	getUsers,
	updateUser,
	deleteUser,
} = require("../controllers/user.controller");
const mapUser = require("../helpers/mapUser");

const usersService = {
	getAll: async (req, res) => {
		try {
			const users = await getUsers();

			res.send({ data: users.map(mapUser) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},

	update: async (req, res) => {
		// админ в данном случае может менять только роли, так что добавляем в опции, вторым аргументом, только одно поле

		const newUser = await updateUser(req.params.id, {
			role: req.body.roleId,
		});

		res.send({ data: mapUser(newUser) });
	},

	delete: async (req, res) => {
		await deleteUser(req.params.id);

		res.send({ error: null });
	},
};

module.exports = {
	usersService,
};
