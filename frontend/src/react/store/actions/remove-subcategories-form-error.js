import { ACTION_TYPE } from "../../../constants";

export const removeSubcategoriesFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_SUBCATEGORY_FORM_ERROR,
	};
};
