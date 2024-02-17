import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const createProductAsync = (subcategoryId, product) => dispatch => {
	productsService
		.create(subcategoryId, product)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_PRODUCT,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.CREATE_PRODUCT_ERROR, payload: e.message });
		});
};
