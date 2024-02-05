import { ACTION_TYPE } from "../../../constants";

const initialCategoriesState = {
	title: "Каталог товаров",
	categories: [],
	options: {
		loadingStatus: false,
	},
	error: "",
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
		case ACTION_TYPE.SET_CATEGORIES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_CATEGORIES_LOADING_STATUS:
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
