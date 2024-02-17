import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const authService = {
	logout: () => request(`${BASE_URL}logout`, "POST"),
	registration: user => request(`${BASE_URL}register`, "POST", user),
	authorization: user => request(`${BASE_URL}login`, "POST", user),
};
