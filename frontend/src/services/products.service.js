import { request } from "../utils";
import { BASE_URL } from "./http.service";

export const productsService = {
	getAll: async id => {
		return await request(`${BASE_URL}subcategories/${id}/products`);
	},
	getOne: async id => {
		return await request(`${BASE_URL}products/${id}`);
	},
};
