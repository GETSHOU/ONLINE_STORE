import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { commentsService } from "../../../services";

export const createCommentAsync = (productId, comment) => dispatch =>
	commentsService
		.create(productId, comment)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_COMMENT,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.CREATE_COMMENT_ERROR, payload: e.message });
		});
