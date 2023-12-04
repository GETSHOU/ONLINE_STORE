import { ACTION_TYPE } from "../../../constants";

const initialSubcategoriesState = { subcategories: [], isLoading: null };

export const subcategoriesReducer = (state = initialSubcategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SUBCATEGORIES:
			return {
				...state,
				subcategories: action.payload,
			};
		case ACTION_TYPE.SET_SUBCATEGORIES_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
