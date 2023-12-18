import { ACTION_TYPE } from "../../../constants";

export const createSubcategory = subcategory => ({
	type: ACTION_TYPE.CREATE_SUBCATEGORY,
	payload: subcategory,
});
