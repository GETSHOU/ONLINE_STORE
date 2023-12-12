import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { AdminContent, PrivateContent } from "../../components";
import { Table } from "./components/Table/Table";
import { ContainerPrivatePage } from "../../components";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const navigate = useNavigate();
	const roleId = useSelector(userRoleSelector);

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

				if (!isLoading) {
					if (!usersResponse.data) {
						setDataNotExist(true);
						navigate("/users-not-exist", { replace: true });

						return;
					} else if (!rolesResponse.data) {
						throw new Error("Ролей нет");
					}

					setUsers(usersResponse.data);
					setRoles(rolesResponse.data);
					setDataNotExist(false);
				}
			})
			.finally(() => setIsLoading(false));
	}, [isAdmin, navigate, shouldUpdateUserList]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<ContainerPrivatePage>
				<AdminContent pageTitle="Пользователи">
					{!isLoading
						? !dataNotExist && (
								<>
									<Table
										users={users}
										roles={roles}
										shouldUpdateUserList={shouldUpdateUserList}
										setShouldUpdateUserList={setShouldUpdateUserList}
									/>
								</>
						  )
						: null}
				</AdminContent>
			</ContainerPrivatePage>
		</PrivateContent>
	);
};
