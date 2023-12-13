import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	userData: {
		id: null,
		email: null,
		name: "Гость",
		roleId: ROLES.GUEST,
	},
	isLoggedIn: false,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				userData: {
					...state.userData,
					...action.payload,
				},
				isLoggedIn: !state.isLoggedIn,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
