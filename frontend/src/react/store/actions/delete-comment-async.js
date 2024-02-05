import { ACTION_TYPE } from "../../../constants";
import { commentsService } from "../../../services";

export const deleteCommentAsync = (productId, commentId) => dispatch => {
	return commentsService
		.delete(productId, commentId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_COMMENT,
				payload: commentId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.DELETE_COMMENT_ERROR, payload: e.message });
		});
};
