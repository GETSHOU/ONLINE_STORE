import { useSelector } from "react-redux";
import { userRoleSelector, userSessionSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ERRORS } from "../../../constants";
import { Error } from "../Error/Error";

export const PrivateContent = ({ children, access, serverError = null }) => {
	const roleId = useSelector(userRoleSelector);
	const userStateSession = useSelector(userSessionSelector);
	const userIsAuthorized = !!sessionStorage.getItem("userData");

	const accessError = checkAccess(access, roleId) ? null : ERRORS.ACCESS_DENIED;
	const error = serverError || accessError;

	return (
		<>
			{userIsAuthorized && !userStateSession ? null : error ? (
				<Error error={error} />
			) : (
				children
			)}
		</>
	);
};
