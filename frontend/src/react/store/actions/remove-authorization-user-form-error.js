import { ACTION_TYPE } from "../../../constants";

export const removeAuthorizationUserFormError = () => {
	return {
		type: ACTION_TYPE.REMOVE_AUTHORIZATION_USER_FORM_ERROR,
	};
};
