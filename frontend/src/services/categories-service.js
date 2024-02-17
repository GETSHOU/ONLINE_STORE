import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const categoriesService = {
	get: () => request(`${BASE_URL}categories`),
	create: category =>
		request(`${BASE_URL}categories/create`, "POST", { title: category }),
	update: (categoryId, updatedCategoryTitle) =>
		request(`${BASE_URL}categories/${categoryId}/update`, "PATCH", {
			title: updatedCategoryTitle,
		}),
	delete: categoryId => request(`${BASE_URL}categories/${categoryId}/delete`, "DELETE"),
};
