import { ACTION_TYPE } from "../../../constants";
import { categoriesService } from "../../../services";

export const getCategoriesAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING_STATUS, payload: true });

	categoriesService
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
			dispatch({ type: ACTION_TYPE.SET_CATEGORIES_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_CATEGORIES_LOADING_STATUS, payload: false });
		});
};
