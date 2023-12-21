import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { PrivateProvider, PrivateContent } from "../../components";
import { UsersTable } from "./components/UsersTable/UsersTable";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const navigate = useNavigate();
	const roleId = useSelector(userRoleSelector);

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		setIsLoading(true);

		Promise.all([request("/api/users"), request("/api/roles")])
			.then(([usersResponse, rolesResponse]) => {
				if (usersResponse.error || rolesResponse.error) {
					setServerError(usersResponse.error || rolesResponse.error);

					return;
				}

				if (!isLoading) {
					if (usersResponse.data.length === 0) {
						setDataNotExist(true);
						navigate("/users-m-not-exist", { replace: true });

						return;
					} else if (rolesResponse.data.length === 0) {
						throw new Error("Ролей нет");
					}

					setUsers(usersResponse.data);
					setRoles(rolesResponse.data);
					setDataNotExist(false);
				}
			})
			.finally(() => {
				setDataIsLoaded(true);
				setIsLoading(false);
			});
	}, [isAdmin, navigate, shouldUpdateUserList]);

	return (
		<PrivateProvider access={[ROLES.ADMIN]} serverError={serverError}>
			<PrivateContent pageTitle={"Пользователи"}>
				{!isLoading
					? !dataNotExist && (
							<>
								<UsersTable
									users={users}
									roles={roles}
									dataIsLoaded={dataIsLoaded}
									shouldUpdateUserList={shouldUpdateUserList}
									setShouldUpdateUserList={setShouldUpdateUserList}
								/>
							</>
					  )
					: null}
			</PrivateContent>
		</PrivateProvider>
	);
};
