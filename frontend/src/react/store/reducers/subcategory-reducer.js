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
		default:
			return state;
	}
};
