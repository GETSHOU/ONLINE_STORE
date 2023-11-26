const { register, login } = require("../controllers/user.controller");
const mapUser = require("../helpers/mapUser");

const authService = {
	register: async (req, res) => {
		try {
			const { user, token } = await register(
				req.body.email,
				req.body.name,
				req.body.password
			);

			res
				.cookie("token", token, { httpOnly: true })
				.send({ error: null, user: mapUser(user) });
		} catch (e) {
			res.send({ error: e.message || "Unknown error" });
		}
	},

	login: async (req, res) => {
		try {
			const { user, token } = await login(req.body.email, req.body.password);

			res
				.cookie("token", token, { httpOnly: true })
				.send({ error: null, user: mapUser(user) });
		} catch (e) {
			res.send({ error: e.message || "login: Неизвестная ошибка" });
		}
	},

	logout: (req, res) => {
		res.cookie("token", "", { httpOnly: true }).send({});
	},
};

module.exports = {
	authService,
};
