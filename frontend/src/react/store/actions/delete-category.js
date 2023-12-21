import { ACTION_TYPE } from "../../../constants";

export const deleteCategory = categoryId => ({
	type: ACTION_TYPE.DELETE_CATEGORY,
	payload: categoryId,
});
