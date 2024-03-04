import { ACTION_TYPE_ERORRS } from "../../../constants";

const initialAuthState = {
	regError: null,
	authError: null,
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case ACTION_TYPE_ERORRS.REGISTRATION_USER_FORM_ERROR:
			return {
				...state,
				regError: action.payload,
			};
		case ACTION_TYPE_ERORRS.REMOVE_REGISTRATION_USER_FORM_ERROR:
			return {
				...state,
				regError: initialAuthState.regError,
			};
		case ACTION_TYPE_ERORRS.AUTHORIZATION_USER_FORM_ERROR:
			return {
				...state,
				authError: action.payload,
			};
		case ACTION_TYPE_ERORRS.REMOVE_AUTHORIZATION_USER_FORM_ERROR:
			return {
				...state,
				authError: initialAuthState.authError,
			};
		default:
			return state;
	}
};
