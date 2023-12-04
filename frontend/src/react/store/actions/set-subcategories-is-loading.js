import { ACTION_TYPE } from "../../../constants";

export const setSubcategoriesIsLoading = bool => ({
	type: ACTION_TYPE.SET_SUBCATEGORIES_IS_LOADING,
	payload: bool,
});
