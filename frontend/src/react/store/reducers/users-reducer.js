import { ACTION_TYPE } from "../../../constants";

const initialUsersState = {
	users: [],
	options: {
		loadingStatus: false,
	},
	error: null,
};

export const usersReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case ACTION_TYPE.SET_USERS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.SET_USERS_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.UPDATE_USER_ROLE:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.payload.id) {
						return {
							...user,
							...action.payload.user,
						};
					}
					return { ...user };
				}),
			};
		case ACTION_TYPE.UPDATE_USER_ROLE_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.DELETE_USER:
			return {
				...state,
				users: state.users.filter(user => user.id !== action.payload),
			};
		case ACTION_TYPE.DELETE_USER_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
