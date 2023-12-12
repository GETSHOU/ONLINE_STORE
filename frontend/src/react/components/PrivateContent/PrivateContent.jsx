import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ERRORS } from "../../../constants";
import { Error } from "../Error/Error";

export const PrivateContent = ({ children, access, serverError = null }) => {
	const [accessError, setAccessError] = useState(null);
	const roleId = useSelector(userRoleSelector);

	const accessState = checkAccess(access, roleId);
	const error = serverError || accessError;

	useLayoutEffect(() => {
		if (accessState) {
			setAccessError(null);
		} else {
			setAccessError(ERRORS.ACCESS_DENIED);
		}
	}, [accessState]);

	return <>{error ? <Error error={error} /> : children}</>;
};
