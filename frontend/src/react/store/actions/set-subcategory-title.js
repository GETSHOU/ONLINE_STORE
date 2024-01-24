import { ACTION_TYPE } from "../../../constants";

export const setSubcategoryTitle = title => {
	return {
		type: ACTION_TYPE.SET_SUBCATEGORY_TITLE,
		payload: title,
	};
};
