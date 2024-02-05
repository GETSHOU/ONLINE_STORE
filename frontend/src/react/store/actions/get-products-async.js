import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";
import { getParentCategoryTitle } from "../../../utils";

export const getProductsAsync = id => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING_STATUS, payload: true });

	return productsService
		.getAll(id)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_PRODUCTS,
				payload: res.data,
			});
			dispatch({
				type: ACTION_TYPE.SET_PRODUCTS_TITLE,
				payload: getParentCategoryTitle(res.data),
			});
			// dispatch({
			// 	type: ACTION_TYPE.SET_PRODUCTS,
			// 	payload: [],
			// }); - для теста загрузки данных
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.SET_PRODUCTS_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_PRODUCTS_LOADING_STATUS, payload: false });
		});
};
