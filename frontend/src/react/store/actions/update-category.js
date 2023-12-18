import { ACTION_TYPE } from "../../../constants";

export const updateCategory = category => ({
	type: ACTION_TYPE.UPDATE_CATEGORY,
	payload: category,
});
