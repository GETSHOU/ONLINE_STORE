import { ACTION_TYPE } from "../../../constants";

export const setProducts = products => ({
	type: ACTION_TYPE.SET_PRODUCTS,
	payload: products,
});
