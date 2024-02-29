import { ACTION_TYPE, SORTING_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const getSortedAllProductsAsync = sortType => dispatch =>
	productsService
		.getSortedAllProducts(sortType)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type:
					sortType === SORTING_TYPE.BY_ASC
						? ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_ASC
						: sortType === SORTING_TYPE.BY_DESC &&
						  ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_DESC,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({
				type:
					sortType === SORTING_TYPE.BY_ASC
						? ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_ASC_ERROR
						: sortType === SORTING_TYPE.BY_DESC &&
						  ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_DESC_ERROR,
				payload: e.message,
			});
		});
