import { ACTION_TYPE } from "../../../constants";

const initialSubcategoriesState = {
	title: "",
	subcategories: [],
};

export const subcategoriesReducer = (state = initialSubcategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SUBCATEGORIES:
			return {
				...state,
				subcategories: action.payload,
			};
		case ACTION_TYPE.SET_CATEGORY_TITLE:
			return {
				...state,
				title: action.payload,
			};
		default:
			return state;
	}
};
