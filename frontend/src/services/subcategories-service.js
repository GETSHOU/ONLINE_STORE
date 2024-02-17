import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const subcategoriesService = {
	get: async id => {
		return await request(`${BASE_URL}categories/${id}/subcategories`);
	},
	create: async (categoryId, subcategory) => {
		return await request(
			`${BASE_URL}categories/${categoryId}/subcategories/create`,
			"POST",
			{ title: subcategory },
		);
	},
	update: async (subcategoryId, updatedSubcategoryTitle) => {
		return await request(`${BASE_URL}subcategories/${subcategoryId}/update`, "PATCH", {
			title: updatedSubcategoryTitle,
		});
	},
	delete: async subcategoryId => {
		return await request(`${BASE_URL}subcategories/${subcategoryId}/delete`, "DELETE");
	},
};
