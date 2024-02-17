import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const productsService = {
	getAll: async id => {
		return await request(`${BASE_URL}subcategories/${id}/products`);
	},
	getOne: async id => {
		return await request(`${BASE_URL}products/${id}`);
	},
	create: async (subcategoryId, product) => {
		return await request(
			`${BASE_URL}subcategories/${subcategoryId}/products/create`,
			"POST",
			product,
		);
	},
	update: async (productId, updatedProduct) => {
		return await request(
			`${BASE_URL}products/${productId}/update`,
			"PATCH",
			updatedProduct,
		);
	},
	delete: async productId => {
		return await request(`${BASE_URL}products/${productId}/delete`, "DELETE");
	},
};
