import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	id: null,
	email: null,
	name: null,
	roleId: ROLES.GUEST,
	isLoggedIn: false,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
				isLoggedIn: true,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
