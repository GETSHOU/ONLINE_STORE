import { ACTION_TYPE } from "../../../constants";

export const setCatalog = catalog => {
	return {
		type: ACTION_TYPE.SET_CATALOG,
		payload: catalog,
	};
};
