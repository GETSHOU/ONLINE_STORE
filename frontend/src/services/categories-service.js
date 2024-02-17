import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const categoriesService = {
	get: async () => {
		return await request(`${BASE_URL}categories`);
	},
	create: async category => {
		return await request(`${BASE_URL}categories/create`, "POST", { title: category });
	},
	update: async (categoryId, updatedCategoryTitle) => {
		return await request(`${BASE_URL}categories/${categoryId}/update`, "PATCH", {
			title: updatedCategoryTitle,
		});
	},
	delete: async categoryId => {
		return await request(`${BASE_URL}categories/${categoryId}/delete`, "DELETE");
	},
};
