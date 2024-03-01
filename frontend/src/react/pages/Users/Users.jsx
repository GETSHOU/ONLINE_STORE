import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesAsync, getUsersAsync } from "../../store/actions";
import {
	usersSelector,
	rolesSelector,
	userRoleSelector,
	usersErrorSelector,
	rolesErrorSelector,
	usersLoadingStatusSelector,
	rolesLoadingStatusSelector,
} from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";
import { PrivateProvider, PrivateContent } from "../../components";
import { UsersTable } from "./components/UsersTable/UsersTable";

export const Users = () => {
	const users = useSelector(usersSelector);
	const roles = useSelector(rolesSelector);
	const roleId = useSelector(userRoleSelector);
	const usersServerError = useSelector(usersErrorSelector);
	const rolesServerError = useSelector(rolesErrorSelector);
	const usersLoadingStatus = useSelector(usersLoadingStatusSelector);
	const rolesLoadingStatus = useSelector(rolesLoadingStatusSelector);

	const dispatch = useDispatch();

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		Promise.all([dispatch(getUsersAsync()), dispatch(getRolesAsync())]);
	}, [isAdmin, dispatch]);

	return (
		<PrivateProvider
			access={[ROLES.ADMIN]}
			serverError={usersServerError || rolesServerError}
		>
			<PrivateContent subTitle={"Пользователи"} pageTitle={"Управление пользователями"}>
				<UsersTable
					users={users}
					roles={roles}
					usersServerError={usersServerError}
					rolesServerError={rolesServerError}
					usersLoadingStatus={usersLoadingStatus}
					rolesLoadingStatus={rolesLoadingStatus}
				/>
			</PrivateContent>
		</PrivateProvider>
	);
};
