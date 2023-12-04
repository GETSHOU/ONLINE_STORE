import { ACTION_TYPE } from "../../../constants";

const initialCategoriesState = { categories: [], isLoading: null };

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case ACTION_TYPE.SET_CATEGORIES_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
