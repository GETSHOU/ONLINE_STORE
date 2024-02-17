import { ACTION_TYPE } from "../../../constants";

export const removeRegistrationUserFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_REGISTRATION_USER_FORM_ERROR,
	};
};
