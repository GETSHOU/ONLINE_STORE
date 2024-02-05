import { request } from "../utils";
import { BASE_URL } from "./http.service";

export const commentsService = {
	create: async (productId, commentText) =>
		await request(`${BASE_URL}products/${productId}/comments/create`, "POST", {
			content: commentText,
		}),
	update: async (commentId, updatedComment) =>
		await request(`${BASE_URL}comments/${commentId}/update`, "PATCH", updatedComment),
	delete: async (productId, commentId) =>
		await request(
			`${BASE_URL}products/${productId}/comments/${commentId}/delete`,
			"DELETE",
		),
};
