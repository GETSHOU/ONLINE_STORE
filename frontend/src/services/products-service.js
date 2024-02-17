import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const productsService = {
	getAll: id => request(`${BASE_URL}subcategories/${id}/products`),
	getOne: id => request(`${BASE_URL}products/${id}`),
	create: (subcategoryId, product) =>
		request(`${BASE_URL}subcategories/${subcategoryId}/products/create`, "POST", product),
	update: (productId, updatedProduct) =>
		request(`${BASE_URL}products/${productId}/update`, "PATCH", updatedProduct),
	delete: productId => request(`${BASE_URL}products/${productId}/delete`, "DELETE"),
};
