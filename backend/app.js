require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { authService, usersService, rolesService } = require("./services");

const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const { ROLES } = require("./constants/roles");

const devPort = 3000;
const port = 3005;
const app = express();

// app.use(express.static("../frontend/build"));

app.use(cors({ origin: `http://localhost:${devPort}`, credentials: true }));

app.use(cookieParser());
app.use(express.json());

// Registration
app.post("/register", (req, res) => {
	authService.register(req, res);
});

// login
app.post("/login", (req, res) => {
	authService.login(req, res);
});

// ----- НИЖЕ ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ -----
app.use(authenticated);

// Logout
app.post("/logout", (req, res) => {
	authService.logout(req, res);
});

// получаем пользователей
app.get("/users", hasRole([ROLES.ADMIN]), (req, res) => {
	usersService.getAll(req, res);
});

// получение ролей
app.get("/users/roles", hasRole([ROLES.ADMIN]), (req, res) => {
	rolesService.get(req, res);
});

// редактирование пользователя
app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
	usersService.update(req, res);
});

// удаление пользователя
app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
	usersService.delete(req, res);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port} ...`);
	});
});
