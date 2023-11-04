import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLES.GUEST,
	name: null,
	nickname: null,
	phone: null,
	basket: [],
	session: null,
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
