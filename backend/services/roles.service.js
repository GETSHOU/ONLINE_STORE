const { getRoles } = require("../controllers/user.controller");

const rolesService = {
	get: async (req, res) => {
		try {
			const roles = getRoles();

			res.send({ data: roles });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = {
	rolesService,
};
