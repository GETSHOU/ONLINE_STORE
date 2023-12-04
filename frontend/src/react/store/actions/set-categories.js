import { ACTION_TYPE } from "../../../constants";

export const setCategories = categories => ({
	type: ACTION_TYPE.SET_CATEGORIES,
	payload: categories,
});
