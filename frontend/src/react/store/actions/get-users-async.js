import { ACTION_TYPE } from "../../../constants";
import { usersService } from "../../../services";

export const getUsersAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_USERS_LOADING_STATUS, payload: true });

	usersService
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
			dispatch({ type: ACTION_TYPE.SET_USERS_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_USERS_LOADING_STATUS, payload: false });
		});
};
