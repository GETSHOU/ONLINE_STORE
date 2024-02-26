import { ACTION_TYPE, SORTING_TYPE } from "../../../constants";

export const getSortedProducts = (products, sortType) => {
	return {
		type:
			sortType === SORTING_TYPE.BY_ASC
				? ACTION_TYPE.SET_SORTED_PRODUCTS_BY_ASC
				: sortType === SORTING_TYPE.BY_DESC && ACTION_TYPE.SET_SORTED_PRODUCTS_BY_DESC,
		payload: products,
	};
};
