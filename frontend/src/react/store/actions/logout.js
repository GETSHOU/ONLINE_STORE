import { ACTION_TYPE, SESSION_STORAGE_NAMES } from "../../../constants";
import { request } from "../../../utils";

export const logout = () => {
	return dispatch => {
		request("/api/logout", "POST").then(() => {
			sessionStorage.removeItem(SESSION_STORAGE_NAMES.USER_DATA);
			dispatch({ type: ACTION_TYPE.LOGOUT });
		});
	};
};
