import { ACTION_TYPE } from "../../../constants";

export const closeModal = payload => {
	return {
		type: ACTION_TYPE.CLOSE_MODAL,
		payload: payload,
	};
};
