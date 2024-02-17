import { ACTION_TYPE } from "../../../constants";

export const removeCategoriesFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_CATEGORY_FORM_ERROR,
	};
};
