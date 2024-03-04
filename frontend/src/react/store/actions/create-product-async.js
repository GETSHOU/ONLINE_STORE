import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { productsService } from "../../../services";

export const createProductAsync = (subcategoryId, product) => dispatch =>
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
			dispatch({
				type: ACTION_TYPE_ERORRS.CREATE_PRODUCT_FORM_ERROR,
				payload: e.message,
			});
		});
