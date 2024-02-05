import { request } from "../utils";
import { BASE_URL } from "./http.service";

export const categoriesService = {
	get: async () => {
		return await request(`${BASE_URL}categories`);
	},
};
