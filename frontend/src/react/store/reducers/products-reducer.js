import { ACTION_TYPE } from "../../../constants";

const initialProductsState = {
	title: "",
	products: [],
	options: {
		loadingStatus: false,
	},
	error: "",
};

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_TITLE:
			return {
				...state,
				title: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		default:
			return state;
	}
};
