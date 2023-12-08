import { ACTION_TYPE } from "../../../constants";

export const setProductIsLoading = bool => ({
	type: ACTION_TYPE.SET_PRODUCT_IS_LOADING,
	payload: bool,
});
