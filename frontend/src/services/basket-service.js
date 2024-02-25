import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const basketService = {
	get: userId => request(`${BASE_URL}orders/${userId}`),
	create: (userId, order) => request(`${BASE_URL}orders/${userId}/create`, "POST", order),
};
