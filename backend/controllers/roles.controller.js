const { ROLES } = require("../constants/roles");

function getRoles() {
	return [
		{ id: ROLES.ADMIN, name: "Админ" },
		{ id: ROLES.MODERATOR, name: "Модератор" },
		{ id: ROLES.USER, name: "Пользователь" },
	];
}

const rolesController = {
	get: async (res) => {
		try {
			const roles = getRoles();

			res.send({ data: roles });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = rolesController;
