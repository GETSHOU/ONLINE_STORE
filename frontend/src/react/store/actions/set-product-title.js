import { ACTION_TYPE } from "../../../constants";

export const setProductTitle = title => {
	return {
		type: ACTION_TYPE.SET_PRODUCT_TITLE,
		payload: title,
	};
};
