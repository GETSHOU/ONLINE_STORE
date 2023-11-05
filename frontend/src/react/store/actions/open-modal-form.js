import { ACTION_TYPE } from "../../../constants";

export const openModalForm = payload => {
	return {
		type: ACTION_TYPE.OPEN_MODAL_FORM,
		payload: payload,
	};
};
