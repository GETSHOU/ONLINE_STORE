import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const getProductAsync = id => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_PRODUCT_LOADING_STATUS, payload: true });

	productsService
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
			dispatch({ type: ACTION_TYPE.SET_PRODUCT_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_PRODUCT_LOADING_STATUS, payload: false });
		});
};
