import { ACTION_TYPE } from "../../../constants";

export const updateProduct = product => ({
	type: ACTION_TYPE.UPDATE_PRODUCT,
	payload: product,
});
