import { request } from "../utils";
import { BASE_URL } from "./http.service";

export const subcategoriesService = {
	get: async id => {
		return await request(`${BASE_URL}categories/${id}/subcategories`);
	},
};
