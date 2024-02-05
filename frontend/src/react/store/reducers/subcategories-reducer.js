import { ACTION_TYPE } from "../../../constants";

const initialSubcategoriesState = {
	title: "",
	subcategories: [],
	options: {
		loadingStatus: false,
	},
	error: "",
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
		case ACTION_TYPE.SET_SUBCATEGORIES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_SUBCATEGORIES_LOADING_STATUS:
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
