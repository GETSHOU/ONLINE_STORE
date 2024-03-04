import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { authService } from "../../../services";

export const logoutAsync = localStorageBasket => dispatch =>
	authService
		.logout()
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({ type: ACTION_TYPE.LOGOUT, payload: localStorageBasket });

			sessionStorage.removeItem("userData");
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.LOGOUT_ERROR, payload: e.message });
		});
