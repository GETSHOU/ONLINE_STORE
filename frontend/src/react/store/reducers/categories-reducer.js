import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";

const initialCategoriesState = {
	title: "Каталог товаров",
	categories: [],
	options: {
		loadingStatus: false,
	},
	error: null,
	errorForm: null,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case ACTION_TYPE.SET_CATEGORIES_TITLE:
			return {
				...state,
				title: action.payload,
			};
		case ACTION_TYPE_LOADERS.SET_CATEGORIES_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.CREATE_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case ACTION_TYPE.UPDATE_CATEGORY:
			return {
				...state,
				categories: state.categories.map(category => {
					if (category.id === action.payload.id) {
						return {
							...category,
							...action.payload.data,
						};
					}
					return { ...category };
				}),
			};
		case ACTION_TYPE.DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(category => category.id !== action.payload),
			};
		case ACTION_TYPE_ERORRS.SET_CATEGORIES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.CREATE_CATEGORY_FORM_ERROR:
			return {
				...state,
				errorForm: action.payload,
			};
		case ACTION_TYPE_ERORRS.REMOVE_CATEGORY_FORM_ERROR:
			return {
				...state,
				errorForm: initialCategoriesState.errorForm,
			};
		case ACTION_TYPE_ERORRS.UPDATE_CATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_ERORRS.DELETE_CATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
