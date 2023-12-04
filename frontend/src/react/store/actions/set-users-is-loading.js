import { ACTION_TYPE } from "../../../constants";

export const setUsersIsLoading = bool => ({
	type: ACTION_TYPE.SET_USERS_IS_LOADING,
	payload: bool,
});
