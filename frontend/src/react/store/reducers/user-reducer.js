import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	id: null,
	email: null,
	name: null,
	session: null,
	roleId: ROLES.GUEST,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
