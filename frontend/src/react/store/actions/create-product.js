import { ACTION_TYPE } from "../../../constants";

export const createProduct = product => ({
	type: ACTION_TYPE.CREATE_PRODUCT,
	payload: product,
});
