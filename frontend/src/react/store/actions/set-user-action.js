import { ACTION_TYPE } from "../../../constants";

export const setUserAction = user => {
	return {
		type: ACTION_TYPE.SET_USER,
		payload: user,
	};
};
