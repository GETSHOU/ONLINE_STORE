import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";
import { categoriesService } from "../../../services";

export const getCategoriesAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE_LOADERS.SET_CATEGORIES_LOADING_STATUS, payload: true });

	return categoriesService
		.get()
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_CATEGORIES,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.SET_CATEGORIES_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({
				type: ACTION_TYPE_LOADERS.SET_CATEGORIES_LOADING_STATUS,
				payload: false,
			});
		});
};
