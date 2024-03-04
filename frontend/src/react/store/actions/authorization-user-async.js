import { ACTION_TYPE_ERORRS } from "../../../constants";
import { authService } from "../../../services";
import { closeModal } from "./close-modal";
import { setUser } from "./set-user";

export const authorizationUserAsync = user => dispatch =>
	authService
		.authorization(user)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch(setUser(res.user));

			sessionStorage.setItem("userData", JSON.stringify(res.user));

			dispatch(closeModal());
		})
		.catch(e => {
			dispatch({
				type: ACTION_TYPE_ERORRS.AUTHORIZATION_USER_FORM_ERROR,
				payload: e.message,
			});
		});
