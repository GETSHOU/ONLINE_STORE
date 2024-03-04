import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";
import { usersService } from "../../../services";

export const getUsersAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE_LOADERS.SET_USERS_LOADING_STATUS, payload: true });

	return usersService
		.get()
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_USERS,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.SET_USERS_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE_LOADERS.SET_USERS_LOADING_STATUS, payload: false });
		});
};
