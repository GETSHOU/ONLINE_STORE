import { ACTION_TYPE } from "../../../constants";

export const removeProductFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_PRODUCT_FORM_ERROR,
	};
};
