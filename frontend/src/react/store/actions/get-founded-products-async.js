import { ACTION_TYPE } from "../../../constants";
import { productsService } from "../../../services";

export const getFoundedProductsAsync = (searchQuery, page, limit) => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_FOUNDED_PRODUCTS_LOADING_STATUS, payload: true });

	return productsService
		.getFoundedProducts(searchQuery, page, limit)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_FOUNDED_PRODUCTS,
				payload: {
					products: res.data.products,
					lastPage: res.data.lastPage,
					currentPage: res.data.currentPage,
					countFoundedProducts: res.data.countFoundedProducts,
				},
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.SET_FOUNDED_PRODUCTS_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_FOUNDED_PRODUCTS_LOADING_STATUS, payload: false });
		});
};
