import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const updateProductAsync = (productId, updatedProduct) => dispatch =>
	productsService
		.update(productId, updatedProduct)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.UPDATE_PRODUCT,
				payload: { id: productId, data: res.data },
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.UPDATE_PRODUCT_ERROR, payload: e.message });
		});
