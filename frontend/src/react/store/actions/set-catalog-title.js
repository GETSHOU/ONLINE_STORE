import { ACTION_TYPE } from "../../../constants";

export const setCatalogTitle = title => {
	return {
		type: ACTION_TYPE.SET_CATALOG_TITLE,
		payload: title,
	};
};
