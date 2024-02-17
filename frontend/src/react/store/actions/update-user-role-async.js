import { ACTION_TYPE } from "../../../constants";
import { usersService } from "../../../services";

export const updateUserRoleAsync = (userId, updatedRoleId) => dispatch => {
	usersService
		.update(userId, updatedRoleId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.UPDATE_USER_ROLE,
				payload: { id: userId, user: res.data },
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.UPDATE_USER_ROLE_ERROR, payload: e.message });
		});
};
