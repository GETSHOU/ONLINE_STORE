import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const usersService = {
	get: () => request(`${BASE_URL}users`),
	update: (userId, roleId) =>
		request(`${BASE_URL}users/${userId}/update`, "PATCH", { roleId }),
	delete: userId => request(`${BASE_URL}users/${userId}/delete`, "DELETE"),
};
