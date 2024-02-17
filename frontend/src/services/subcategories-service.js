import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const subcategoriesService = {
	get: id => request(`${BASE_URL}categories/${id}/subcategories`),
	create: (categoryId, subcategory) =>
		request(`${BASE_URL}categories/${categoryId}/subcategories/create`, "POST", {
			title: subcategory,
		}),
	update: (subcategoryId, updatedSubcategoryTitle) =>
		request(`${BASE_URL}subcategories/${subcategoryId}/update`, "PATCH", {
			title: updatedSubcategoryTitle,
		}),
	delete: subcategoryId =>
		request(`${BASE_URL}subcategories/${subcategoryId}/delete`, "DELETE"),
};
