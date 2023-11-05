import { ACTION_TYPE } from "../../../constants";

export const closeModalForm = payload => {
	return {
		type: ACTION_TYPE.CLOSE_MODAL_FORM,
		payload: payload,
	};
};
