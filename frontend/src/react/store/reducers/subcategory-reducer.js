import { ACTION_TYPE } from "../../../constants";

const initialSubcategoryState = {
	id: "",
	parent: "",
	title: "",
	products: [],
};

export const subcategoryReducer = (state = initialSubcategoryState, action) => {
	switch (action.type) {
		case ACTION_TYPE.CREATE_SUBCATEGORY:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.UPDATE_SUBCATEGORY:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.DELETE_SUBCATEGORY:
			return initialSubcategoryState;
		default:
			return state;
	}
};
