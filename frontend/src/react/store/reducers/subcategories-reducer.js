import { ACTION_TYPE } from "../../../constants";

const initialSubcategoriesState = {
	title: "",
	subcategories: [],
	options: {
		loadingStatus: false,
	},
	error: null,
};

export const subcategoriesReducer = (state = initialSubcategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SUBCATEGORIES:
			return {
				...state,
				subcategories: action.payload,
			};
		case ACTION_TYPE.SET_SUBCATEGORIES_TITLE:
			return {
				...state,
				title: action.payload,
			};
		case ACTION_TYPE.SET_SUBCATEGORIES_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.CREATE_SUBCATEGORY:
			return {
				...state,
				subcategories: [...state.subcategories, action.payload],
			};
		case ACTION_TYPE.UPDATE_SUBCATEGORY:
			return {
				...state,
				subcategories: state.subcategories.map(subcategory => {
					if (subcategory.id === action.payload.id) {
						return {
							...subcategory,
							...action.payload.data,
						};
					}
					return { ...subcategory };
				}),
			};
		case ACTION_TYPE.DELETE_SUBCATEGORY:
			return {
				...state,
				subcategories: state.subcategories.filter(
					subcategory => subcategory.id !== action.payload,
				),
			};
		case ACTION_TYPE.SET_SUBCATEGORIES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.CREATE_SUBCATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.UPDATE_SUBCATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.DELETE_SUBCATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.REMOVE_SUBCATEGORIES_FORM_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
