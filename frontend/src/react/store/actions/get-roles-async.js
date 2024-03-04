import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";
import { rolesService } from "../../../services";

export const getRolesAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE_LOADERS.SET_ROLES_LOADING_STATUS, payload: true });

	return rolesService
		.get()
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_ROLES,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.SET_ROLES_ERROR, payload: e.message });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE_LOADERS.SET_ROLES_LOADING_STATUS, payload: false });
		});
};
