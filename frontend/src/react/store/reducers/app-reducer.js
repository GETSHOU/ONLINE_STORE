import { ACTION_TYPE } from "../../../constants";

const initialAppState = {
	modalForm: {
		isOpen: false,
		currentModal: "",
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.OPEN_MODAL_FORM:
			return {
				...state,
				modalForm: {
					...state.modalForm,
					isOpen: true,
					currentModal: action.payload,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL_FORM:
			return {
				...state,
				modalForm: {
					...state.modalForm,
					isOpen: false,
					currentModal: "",
				},
			};
		default:
			return state;
	}
};
