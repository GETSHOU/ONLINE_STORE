import { ACTION_TYPE } from "../../../constants";

export const openModal = payload => {
	return {
		type: ACTION_TYPE.OPEN_MODAL,
		payload: payload,
	};
};
