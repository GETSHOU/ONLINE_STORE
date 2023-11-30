import { useSelector } from "react-redux";
import { userRoleSelector, userIsLoggedInSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ERRORS } from "../../../constants";
import { Error } from "../Error/Error";

export const PrivateContent = ({ children, access, serverError = null }) => {
	const roleId = useSelector(userRoleSelector);
	const userIsLoggedIn = useSelector(userIsLoggedInSelector);

	const accessError = checkAccess(access, roleId) ? null : ERRORS.ACCESS_DENIED;
	const error = serverError || accessError;

	return <>{!userIsLoggedIn ? null : error ? <Error error={error} /> : children}</>;
};
