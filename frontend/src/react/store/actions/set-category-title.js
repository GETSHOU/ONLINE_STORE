import { ACTION_TYPE } from "../../../constants";

export const setCategoryTitle = title => {
	return {
		type: ACTION_TYPE.SET_CATEGORY_TITLE,
		payload: title,
	};
};
