import { ACTION_TYPE } from "../../../constants";

const initialProductsState = {
	title: "",
	products: [],
};

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case ACTION_TYPE.SET_SUBCATEGORY_TITLE:
			return {
				...state,
				title: action.payload,
			};
		default:
			return state;
	}
};
