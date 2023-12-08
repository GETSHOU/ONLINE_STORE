import { ACTION_TYPE } from "../../../constants";

const initialProductsState = { products: [], isLoading: null };

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
