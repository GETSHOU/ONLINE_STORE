import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { usersService } from "../../../services";

export const deleteUserAsync = userId => dispatch =>
	usersService
		.delete(userId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_USER,
				payload: userId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.DELETE_USER_ERROR, payload: e.message });
		});
