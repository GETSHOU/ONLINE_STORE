import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const rolesService = {
	get: () => request(`${BASE_URL}roles`),
};
