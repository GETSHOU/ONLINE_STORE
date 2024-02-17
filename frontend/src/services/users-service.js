import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const usersService = {
	get: async () => {
		return await request(`${BASE_URL}users`);
	},
	update: async (userId, roleId) => {
		return await request(`${BASE_URL}users/${userId}/update`, "PATCH", { roleId });
	},
	delete: async userId => {
		return await request(`${BASE_URL}users/${userId}/delete`, "DELETE");
	},
};
