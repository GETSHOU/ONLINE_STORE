import { ACTION_TYPE } from "../../../constants";

export const createCategory = category => ({
	type: ACTION_TYPE.CREATE_CATEGORY,
	payload: category,
});
