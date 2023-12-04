import { ACTION_TYPE } from "../../../constants";

export const setUsers = users => ({
	type: ACTION_TYPE.SET_USERS,
	payload: users,
});
