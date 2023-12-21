import { ACTION_TYPE } from "../../../constants";

export const updateSubcategory = subcategory => ({
	type: ACTION_TYPE.UPDATE_SUBCATEGORY,
	payload: subcategory,
});
