import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";
import { productsService } from "../../../services";

export const getProductAsync = id => dispatch => {
	dispatch({ type: ACTION_TYPE_LOADERS.SET_PRODUCT_LOADING_STATUS, payload: true });

	return productsService
		.getOne(id)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_PRODUCT,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.SET_PRODUCT_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE_LOADERS.SET_PRODUCT_LOADING_STATUS, payload: false });
		});
};
