import { ACTION_TYPE } from "../../../constants";

export const setCategoriesIsLoading = bool => ({
	type: ACTION_TYPE.SET_CATEGORIES_IS_LOADING,
	payload: bool,
});
