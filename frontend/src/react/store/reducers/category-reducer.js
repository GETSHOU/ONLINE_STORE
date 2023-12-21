import { ACTION_TYPE } from "../../../constants";

const initialCategoryState = {
	id: "",
	title: "",
	subcategories: [],
};

export const categoryReducer = (state = initialCategoryState, action) => {
	switch (action.type) {
		case ACTION_TYPE.CREATE_CATEGORY:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.UPDATE_CATEGORY:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.DELETE_CATEGORY:
			return initialCategoryState;
		default:
			return state;
	}
};
