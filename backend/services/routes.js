const baseUrl = "/api/";

const routes = {
	auth: {
		register: `${baseUrl}register`,
		login: `${baseUrl}login`,
		logout: `${baseUrl}logout`,
	},
	usersManagement: {
		get: `${baseUrl}users`,
		update: `${baseUrl}users/:userId/update`,
		delete: `${baseUrl}users/:userId/delete`,
	},
	rolesManagement: {
		get: `${baseUrl}users/roles`,
	},
	categoriesManagement: {
		get: `${baseUrl}categories`,
		create: `${baseUrl}categories/create`,
		update: `${baseUrl}categories/:categoryId/update`,
		delete: `${baseUrl}categories/:categoryId/delete`,
	},
	subcategoriesManagement: {
		get: `${baseUrl}categories/:categoryId/subcategories`,
		create: `${baseUrl}categories/:categoryId/subcategories/create`,
		update: `${baseUrl}subcategories/:subcategoryId/update`,
		delete: `${baseUrl}subcategories/:subcategoryId/delete`,
	},
	productsManagement: {
		getAll: `${baseUrl}subcategories/:subcategoryId/products`,
		getOne: `${baseUrl}products/:productId`,
		create: `${baseUrl}subcategories/:subcategoryId/products/create`,
		update: `${baseUrl}subcategories/:subcategoryId/products/:productId/update`,
		delete: `${baseUrl}subcategories/:subcategoryId/products/:productId/delete`,
	},
	commentsManagement: {
		get: `${baseUrl}products/:productId/comments`,
		create: `${baseUrl}products/:productId/comments/create`,
		delete: `${baseUrl}products/:productId/comments/:commentId/delete`,
	},
};

module.exports = routes;
