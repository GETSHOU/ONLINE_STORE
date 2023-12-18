import { ACTION_TYPE } from "../../../constants";

const initialAppState = {
	modal: {
		type: "",
		isOpen: false,
		data: {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION_TYPE.UPDATE_MODAL_INPUT_VALUE:
			return {
				...state,
				modal: {
					...state.modal,
					data: {
						...state.modal.data,
						newTitle: action.payload,
					},
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
