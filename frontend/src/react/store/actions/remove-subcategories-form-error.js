import { ACTION_TYPE } from "../../../constants";

export const removeSubcategoriesFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_SUBCATEGORIES_FORM_ERROR,
	};
};
