import { ROLES, ACTION_TYPE } from "../../../constants";

const initialUserState = {
	userData: {
		id: null,
		name: "Гость",
		email: null,
		roleId: ROLES.GUEST,
		basket: [],
		orders: [],
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
		case ACTION_TYPE.ADD_PRODUCT_IN_BASKET:
			return {
				...state,
				userData: {
					...state.userData,
					basket: [...state.userData.basket, action.payload],
				},
			};
		case ACTION_TYPE.DELETE_PRODUCT_FROM_BASKET:
			return {
				...state,
				userData: {
					...state.userData,
					basket: state.userData.basket.filter(product => product.id !== action.payload),
				},
			};
		default:
			return state;
	}
};
