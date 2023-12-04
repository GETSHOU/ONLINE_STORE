import { ACTION_TYPE } from "../../../constants";

const initialUsersState = { usersList: [], roles: [], isLoading: null };

export const usersReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				usersList: action.payload.users,
				roles: action.payload.roles,
			};
		case ACTION_TYPE.SET_USERS_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
