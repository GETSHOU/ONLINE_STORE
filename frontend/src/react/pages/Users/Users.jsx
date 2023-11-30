import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { AdminContent, PrivateContent } from "../../components";
import { Table } from "./components/Table/Table";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const roleId = useSelector(userRoleSelector);

	const [isLoading, setIsLoading] = useState(false);

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		setIsLoading(true);

		Promise.all([request("/api/users"), request("/api/users/roles")])
			.then(([usersResponse, rolesResponse]) => {
				if (usersResponse.error || rolesResponse.error) {
					setServerError(usersResponse.error || rolesResponse.error);

					return;
				}

				setUsers(usersResponse.data);
				setRoles(rolesResponse.data);

				setIsLoading(false);
			})
			.finally(() => setIsLoading(false));
	}, [shouldUpdateUserList, roleId, isAdmin]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<AdminContent pageTitle="Пользователи">
				{!isLoading ? (
					<Table
						users={users}
						roles={roles}
						shouldUpdateUserList={shouldUpdateUserList}
						setShouldUpdateUserList={setShouldUpdateUserList}
					/>
				) : null}
			</AdminContent>
		</PrivateContent>
	);
};
