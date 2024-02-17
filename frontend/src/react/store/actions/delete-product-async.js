import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const deleteProductAsync = productId => dispatch => {
	productsService
		.delete(productId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_PRODUCT,
				payload: productId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.DELETE_PRODUCT_ERROR, payload: e.message });
		});
};
