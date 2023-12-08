import { ACTION_TYPE } from "../../../constants";

export const deleteComment = commentId => ({
	type: ACTION_TYPE.DELETE_COMMENT,
	payload: commentId,
});
