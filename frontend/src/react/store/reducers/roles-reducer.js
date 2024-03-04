import { ACTION_TYPE, ACTION_TYPE_ERORRS, ACTION_TYPE_LOADERS } from "../../../constants";

const initialRolesState = {
	roles: [],
	options: {
		loadingStatus: false,
	},
	error: null,
};

export const rolesReducer = (state = initialRolesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROLES:
			return {
				...state,
				roles: action.payload,
			};
		case ACTION_TYPE_ERORRS.SET_ROLES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE_LOADERS.SET_ROLES_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		default:
			return state;
	}
};
