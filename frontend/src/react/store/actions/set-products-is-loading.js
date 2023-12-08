import { ACTION_TYPE } from "../../../constants";

export const setProductsIsLoading = bool => ({
	type: ACTION_TYPE.SET_PRODUCTS_IS_LOADING,
	payload: bool,
});
