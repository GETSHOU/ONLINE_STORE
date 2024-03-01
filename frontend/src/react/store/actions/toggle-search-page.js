import { ACTION_TYPE } from "../../../constants";

export const toggleSearchPage = page => {
	return {
		type: ACTION_TYPE.TOGGLE_SEARCH_PAGE,
		payload: page,
	};
};
