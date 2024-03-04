import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";

const initialProductsState = {
	title: "",
	products: [],
	foundedProducts: {
		products: [],
		lastPage: 1,
		currentPage: 1,
		countFoundedProducts: 0,
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
		case ACTION_TYPE.PRODUCTS_SEARCH_PAGE_DEFAULT:
			return {
				...state,
				foundedProducts: initialProductsState.foundedProducts,
			};
		case ACTION_TYPE.TOGGLE_SEARCH_PAGE:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					currentPage: action.payload,
				},
			};
		case ACTION_TYPE.TOGGLE_SEARCH_PAGE_DEFAULT:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					currentPage: initialProductsState.foundedProducts.currentPage,
				},
			};
		case ACTION_TYPE.SET_FOUNDED_PRODUCTS:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					products: action.payload.products || [],
					lastPage: action.payload.lastPage,
					countFoundedProducts: action.payload.countFoundedProducts,
				},
			};
		case ACTION_TYPE_LOADERS.SET_FOUNDED_PRODUCTS_LOADING_STATUS:
			return {
				...state,
				foundedProducts: {
					...state.foundedProducts,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE_ERORRS.SET_FOUNDED_PRODUCTS_ERROR:
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
		case ACTION_TYPE_LOADERS.SET_PRODUCTS_LOADING_STATUS:
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
		case ACTION_TYPE_ERORRS.SET_PRODUCTS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.CREATE_PRODUCT_FORM_ERROR:
			return {
				...state,
				errorForm: action.payload,
			};
		case ACTION_TYPE_ERORRS.REMOVE_PRODUCT_FORM_ERROR:
			return {
				...state,
				errorForm: initialProductsState.errorForm,
			};
		case ACTION_TYPE_ERORRS.UPDATE_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.DELETE_PRODUCT_ERROR:
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
		case ACTION_TYPE_ERORRS.SET_PRODUCTS_BY_ASC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.SET_PRODUCTS_BY_DESC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.SET_FOUNDED_PRODUCTS_BY_ASC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.SET_FOUNDED_PRODUCTS_BY_DESC_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
