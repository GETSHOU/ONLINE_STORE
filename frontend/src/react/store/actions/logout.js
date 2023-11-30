import { ACTION_TYPE } from "../../../constants";

export const logout = () => {
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
