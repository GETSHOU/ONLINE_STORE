import { ACTION_TYPE_ERORRS } from "../../../constants";

export const removeAuthorizationUserFormError = () => {
	return {
		type: ACTION_TYPE_ERORRS.REMOVE_AUTHORIZATION_USER_FORM_ERROR,
	};
};
