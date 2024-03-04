import { ACTION_TYPE_ERORRS } from "../../../constants";

export const removeCategoriesFormError = () => {
	return {
		type: ACTION_TYPE_ERORRS.REMOVE_CATEGORY_FORM_ERROR,
	};
};
