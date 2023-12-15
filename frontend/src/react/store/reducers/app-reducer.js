import { ACTION_TYPE } from "../../../constants";

const initialAppState = {
	modal: {
		isOpen: false,
		modalType: "",
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isOpen: true,
					modalType: action.payload,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isOpen: false,
					modalType: "",
				},
			};
		default:
			return state;
	}
};
