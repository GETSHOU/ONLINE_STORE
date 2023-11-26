import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	id: null,
	email: null,
	name: null,
	roleId: ROLES.GUEST,
	inSession: false,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER_SESSION:
			return {
				...state,
				inSession: action.payload,
			};
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
				inSession: true,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
