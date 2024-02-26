import { ACTION_TYPE, SORTING_TYPE } from "../../../constants";

export const getSortedProductsError = (error, sortType) => {
	return {
		type:
			sortType === SORTING_TYPE.BY_ASC
				? ACTION_TYPE.SET_SORTED_PRODUCTS_BY_ASC_ERROR
				: sortType === SORTING_TYPE.BY_DESC &&
				  ACTION_TYPE.SET_SORTED_PRODUCTS_BY_DESC_ERROR,
		payload: error,
	};
};
