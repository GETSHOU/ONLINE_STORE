import { request } from "../utils";
import { BASE_URL } from "./http-service";

export const commentsService = {
	create: (productId, commentText) =>
		request(`${BASE_URL}products/${productId}/comments/create`, "POST", {
			content: commentText,
		}),
	update: (commentId, updatedComment) =>
		request(`${BASE_URL}comments/${commentId}/update`, "PATCH", updatedComment),
	delete: (productId, commentId) =>
		request(`${BASE_URL}products/${productId}/comments/${commentId}/delete`, "DELETE"),
};
