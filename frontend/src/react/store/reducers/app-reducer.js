import { ACTION_TYPE } from "../../../constants";

const initialAppState = {
	isLoading: true,
	isLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isLogout: !state.isLogout,
			};
		default:
			return state;
	}
};
