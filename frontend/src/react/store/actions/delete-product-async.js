import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { productsService } from "../../../services";
import { closeModal } from "./close-modal";

export const deleteProductAsync = productId => dispatch =>
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

			dispatch(closeModal());
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.DELETE_PRODUCT_ERROR, payload: e.message });
		});
