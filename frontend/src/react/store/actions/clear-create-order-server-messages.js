import { ACTION_TYPE } from "../../../constants";

export const clearCreateOrderServerMessages = () => {
	return {
		type: ACTION_TYPE.CLEAR_CREATE_ORDER_SERVER_MESSAGES,
	};
};
