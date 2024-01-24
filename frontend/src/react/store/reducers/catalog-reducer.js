import { ACTION_TYPE } from "../../../constants";

const initialCatalogState = {
	title: "Каталог товаров",
	catalog: [],
};

export const catalogReducer = (state = initialCatalogState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATALOG:
			return {
				...state,
				catalog: action.payload,
			};
		case ACTION_TYPE.SET_CATALOG_TITLE:
			return {
				...state,
				title: action.payload,
			};
		default:
			return state;
	}
};
