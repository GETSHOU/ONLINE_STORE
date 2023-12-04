import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setUsersIsLoading } from "../../store/actions";
import {
	rolesSelector,
	userRoleSelector,
	usersIsLoadingSelector,
	usersSelector,
} from "../../store/selectors";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { AdminContent, PrivateContent } from "../../components";
import { Table } from "./components/Table/Table";

export const Users = () => {
	// TODO: сделать так, чтобы не мелькал весь список пользователей при редактировании/удалении одного их них
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const dispatch = useDispatch();

	const users = useSelector(usersSelector);
	const roles = useSelector(rolesSelector);
	const roleId = useSelector(userRoleSelector);
	const isLoading = useSelector(usersIsLoadingSelector);

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		dispatch(setUsersIsLoading(true));

		Promise.all([request("/api/users"), request("/api/users/roles")])
			.then(([usersResponse, rolesResponse]) => {
				if (usersResponse.error || rolesResponse.error) {
					setServerError(usersResponse.error || rolesResponse.error);

					return;
				}

				dispatch(setUsers({ users: usersResponse.data, roles: rolesResponse.data }));
			})
			.finally(() => dispatch(setUsersIsLoading(false)));
	}, [dispatch, shouldUpdateUserList, roleId, isAdmin]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<AdminContent pageTitle="Пользователи">
				{isLoading ? null : users.length > 0 ? (
					<Table
						users={users}
						roles={roles}
						shouldUpdateUserList={shouldUpdateUserList}
						setShouldUpdateUserList={setShouldUpdateUserList}
					/>
				) : (
					<div>Пользователей нет</div>
				)}
			</AdminContent>
		</PrivateContent>
	);
};
