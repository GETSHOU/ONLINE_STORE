import { ACTION_TYPE_ERORRS } from "../../../constants";

export const removeProductFormError = () => {
	return {
		type: ACTION_TYPE_ERORRS.REMOVE_PRODUCT_FORM_ERROR,
	};
};
