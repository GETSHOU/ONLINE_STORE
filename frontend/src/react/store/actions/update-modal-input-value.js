import { ACTION_TYPE } from "../../../constants";

export const updateModalInputValue = value => ({
	type: ACTION_TYPE.UPDATE_MODAL_INPUT_VALUE,
	payload: value,
});
