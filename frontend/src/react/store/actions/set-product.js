import { ACTION_TYPE } from "../../../constants";

export const setProduct = product => ({
	type: ACTION_TYPE.SET_PRODUCT,
	payload: product,
});
