import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";
import { subcategoriesService } from "../../../services";
import { getParentCategoryTitle } from "../../../utils";

export const getSubcategoriesAsync = id => dispatch => {
	dispatch({ type: ACTION_TYPE_LOADERS.SET_SUBCATEGORIES_LOADING_STATUS, payload: true });

	return subcategoriesService
		.get(id)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_SUBCATEGORIES,
				payload: res.data,
			});
			dispatch({
				type: ACTION_TYPE.SET_SUBCATEGORIES_TITLE,
				payload: getParentCategoryTitle(res.data),
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.SET_SUBCATEGORIES_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({
				type: ACTION_TYPE_LOADERS.SET_SUBCATEGORIES_LOADING_STATUS,
				payload: false,
			});
		});
};
