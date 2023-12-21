import { ACTION_TYPE } from "../../../constants";

export const deleteSubcategory = subcategoryId => ({
	type: ACTION_TYPE.DELETE_SUBCATEGORY,
	payload: subcategoryId,
});
