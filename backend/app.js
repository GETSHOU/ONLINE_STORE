require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {
	authController,
	usersController,
	rolesController,
	productsController,
	commentsController,
	categoriesController,
	subcategoriesController,
} = require("./controllers");
const { authenticated, hasRole } = require("./middlewares");
const { ROLES } = require("./constants/roles");
const routes = require("./services/routes");

const devPort = 3000;
const port = 3005;
const app = express();

// app.use(express.static("../frontend/build"));

app.use(cors({ origin: `http://localhost:${devPort}`, credentials: true }));

app.use(cookieParser());
app.use(express.json());

// Регистрация
app.post(routes.auth.register, (req, res) => {
	authController.register(
		req.body.email,
		req.body.name,
		req.body.password,
		res
	);
});

// Авторизация
app.post(routes.auth.login, (req, res) => {
	authController.login(req.body.email, req.body.password, res);
});

// Получение категорий
app.get(routes.categoriesManagement.get, (req, res) => {
	categoriesController.get(res);
});

// Получение подкатегорий выбранной категории
app.get(routes.subcategoriesManagement.get, (req, res) => {
	subcategoriesController.get(req.params.categoryId, res);
});

// Получение товаров выбранной подкатегории
app.get(routes.productsManagement.getAll, (req, res) => {
	productsController.getAll(req.params.subcategoryId, res);
});

// Получение одного товара
app.get(routes.productsManagement.getOne, (req, res) => {
	productsController.getOne(req.params.productId, res);
});

// Получение комментариев
app.get(routes.commentsManagement.get, (req, res) => {
	commentsController.get(req.params.productId, res);
});

// ---------------- НИЖЕ ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ ---------------
app.use(authenticated);

// Выход
app.post(routes.auth.logout, (req, res) => {
	authController.logout(res);
});

// Получение пользователей
app.get(routes.usersManagement.get, hasRole([ROLES.ADMIN]), (req, res) => {
	usersController.get(res);
});

// Получение ролей
app.get(routes.rolesManagement.get, hasRole([ROLES.ADMIN]), (req, res) => {
	rolesController.get(res);
});

// Редактирование роли пользователя
app.patch(routes.usersManagement.update, hasRole([ROLES.ADMIN]), (req, res) => {
	usersController.update(req.params.userId, req.body.roleId, res);
});

// Удаление пользователя
app.delete(
	routes.usersManagement.delete,
	hasRole([ROLES.ADMIN]),
	(req, res) => {
		usersController.delete(req.params.userId, res);
	}
);

// Добавление категории
app.post(
	routes.categoriesManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		categoriesController.create(req.body.title, res);
	}
);

// Редактирование категории
app.patch(
	routes.categoriesManagement.update,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		categoriesController.update(
			req.params.categoryId,
			{ title: req.body.title },
			res
		);
	}
);

// Удаление категории
app.delete(
	routes.categoriesManagement.delete,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		categoriesController.delete(req.params.categoryId, res);
	}
);

// Добавление подкатегорий
app.post(
	routes.subcategoriesManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		subcategoriesController.create(req.params.categoryId, req.body.title, res);
	}
);

// Редактирование подкатегории
app.patch(
	routes.subcategoriesManagement.update,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		subcategoriesController.update(
			req.params.subcategoryId,
			{ title: req.body.title },
			res
		);
	}
);

// Удаление подкатегории
app.delete(
	routes.subcategoriesManagement.delete,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		subcategoriesController.delete(req.params.subcategoryId, res);
	}
);

// Добавление товара
app.post(
	routes.productsManagement.create,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		productsController.create(
			req.params.subcategoryId,
			{
				publicId: req.body.publicId,
				title: req.body.title,
				vendor: req.body.vendor,
				vendorCode: req.body.vendorCode,
				specs: req.body.specs,
				price: req.body.price,
				previewImage: req.body.previewImage,
			},
			res
		);
	}
);

// Редактирование товара
app.patch(
	routes.productsManagement.update,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		productsController.update(req.params.productId, req.body, res);
	}
);

// Удаление товара
app.delete(
	routes.productsManagement.delete,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		productsController.delete(req.params.productId, res);
	}
);

// Добавление комментария
app.post(routes.commentsManagement.create, (req, res) => {
	commentsController.create(
		req.params.productId,
		{
			content: req.body.content,
			author: req.user.id,
		},
		res
	);
});

// Удаление комментария
app.delete(
	routes.commentsManagement.delete,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res) => {
		commentsController.delete(req.params.productId, req.params.commentId, res);
	}
);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port} ...`);
	});
});
