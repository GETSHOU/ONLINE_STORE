import { ACTION_TYPE_ERORRS } from "../../../constants";

export const removeRegistrationUserFormError = () => {
	return {
		type: ACTION_TYPE_ERORRS.REMOVE_REGISTRATION_USER_FORM_ERROR,
	};
};
