import { ACTION_TYPE_ERORRS } from "../../../constants";

export const removeSubcategoriesFormError = () => {
	return {
		type: ACTION_TYPE_ERORRS.REMOVE_SUBCATEGORY_FORM_ERROR,
	};
};
