import { ACTION_TYPE } from "../../../constants";
import { request } from "../../../utils";

export const logout = () => {
	return dispatch => {
		request("/api/logout", "POST").then(() => {
			sessionStorage.removeItem("userData");

			const currentBasketDataJSON = localStorage.getItem("basket");
			const basketFromStorage = JSON.parse(currentBasketDataJSON);

			dispatch({ type: ACTION_TYPE.LOGOUT, payload: basketFromStorage });
		});
	};
};
