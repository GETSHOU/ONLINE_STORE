import { ACTION_TYPE } from "../../../constants";

export const setLoading = value => {
	return {
		type: ACTION_TYPE.SET_LOADING,
		payload: value,
	};
};
