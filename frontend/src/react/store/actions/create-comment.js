import { ACTION_TYPE } from "../../../constants";

export const createComment = comment => ({
	type: ACTION_TYPE.CREATE_COMMENT,
	payload: comment,
});
