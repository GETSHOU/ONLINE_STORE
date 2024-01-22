import { ACTION_TYPE } from "../../../constants";
import { request } from "../../../utils";

export const logout = () => {
	return dispatch => {
		request("/api/logout", "POST").then(() => {
			sessionStorage.removeItem("userData");

			dispatch({ type: ACTION_TYPE.LOGOUT });
		});
	};
};
