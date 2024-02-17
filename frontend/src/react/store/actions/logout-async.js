import { ACTION_TYPE } from "../../../constants";
import { authService } from "../../../services";

const currentBasketDataJSON = localStorage.getItem("basket");
const basketFromStorage = JSON.parse(currentBasketDataJSON);

export const logoutAsync = () => dispatch => {
	authService
		.logout()
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({ type: ACTION_TYPE.LOGOUT, payload: basketFromStorage });

			sessionStorage.removeItem("userData");
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.LOGOUT_ERROR, payload: e.message });
		});
};
