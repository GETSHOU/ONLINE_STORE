import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { commentsService } from "../../../services";

export const updateCommentAsync = (commentId, updatedComment) => dispatch =>
	commentsService
		.update(commentId, updatedComment)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.UPDATE_COMMENT,
				payload: { id: commentId, content: res.data },
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.UPDATE_COMMENT_ERROR, payload: e.message });
		});
