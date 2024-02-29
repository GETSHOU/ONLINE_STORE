import { ACTION_TYPE } from "../../../constants";

const initialProductsState = {
	title: "",
	products: [],
	foundedProducts: {
		lastPage: "",
		products: [],
		searchQuery: "",
		loadingStatus: false,
	},
	options: {
		loadingStatus: false,
	},
	error: null,
	errorForm: null,
};

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					products: action.payload.products || [],
					lastPage: action.payload.lastPage,
					searchQuery: action.payload.searchQuery,
				},
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_LOADING_STATUS:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_ERROR:
			return {
				...state,
				error: action.payload,
			};
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
		case ACTION_TYPE.SET_PRODUCTS_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.CREATE_PRODUCT:
			return {
				...state,
				products: [...state.products, action.payload],
			};
		case ACTION_TYPE.UPDATE_PRODUCT:
			return {
				...state,
				products: state.products.map(product => {
					if (product.id === action.payload.id) {
						return {
							...product,
							...action.payload.data,
						};
					}
					return { ...product };
				}),
			};
		case ACTION_TYPE.DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(product => product.id !== action.payload),
			};
		case ACTION_TYPE.SET_PRODUCTS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.CREATE_PRODUCT_FORM_ERROR:
			return {
				...state,
				errorForm: action.payload,
			};
		case ACTION_TYPE.REMOVE_PRODUCT_FORM_ERROR:
			return {
				...state,
				errorForm: initialProductsState.errorForm,
			};
		case ACTION_TYPE.UPDATE_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.DELETE_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_BY_ASC:
			return {
				...state,
				products: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_BY_DESC:
			return {
				...state,
				products: action.payload,
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_ASC:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					products: action.payload,
				},
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_DESC:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					products: action.payload,
				},
			};
		case ACTION_TYPE.SET_PRODUCTS_BY_ASC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCTS_BY_DESC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_ASC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS_BY_DESC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
