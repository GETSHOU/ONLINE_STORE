import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const authService = {
	logout: async () => {
		return await request(`${BASE_URL}logout`, "POST");
	},
	registration: async user => {
		return await request(`${BASE_URL}register`, "POST", user);
	},
	authorization: async user => {
		return await request(`${BASE_URL}login`, "POST", user);
	},
};
