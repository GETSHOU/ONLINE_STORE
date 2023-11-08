require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
	login,
	register,
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
} = require("./controllers/user.controller");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const { ROLES } = require("./constants/roles");

const port = 3005;
const app = express();

app.use(express.static("../frontend/build"));

app.use(cookieParser());
app.use(express.json());

// Registration
app.post("/register", async (req, res) => {
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
});

// login
app.post("/login", async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res
			.cookie("token", token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || "Unknown error" });
	}
});

// Logout
app.post("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true }).send({});
});

app.use(authenticated);
// ----- НИЖЕ ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ -----

// получаем пользователей (только с правами админа)
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers();

	res.send({ data: users.map(mapUser) });
});

// получение ролей
app.get("/users/roles", hasRole([ROLES.ADMIN]), (req, res) => {
	const roles = getRoles();

	res.send({ data: roles });
});

// редактирование пользователя
app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
	// админ в данном случае может менять только роли, так что добавляем в опции, вторым аргументом, только одно поле
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	});

	res.send({ data: mapUser(newUser) });
});

// удаление пользователя
app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null });
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port} ...`);
	});
});
