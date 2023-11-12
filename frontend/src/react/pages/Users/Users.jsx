import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { PrivateContent } from "../../components";
import { Table } from "./components/Table/Table";
import styles from "./Users.module.scss";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const userRole = useSelector(userRoleSelector);

	const isAdmin = checkAccess([ROLES.ADMIN], userRole);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		Promise.all([request("/users"), request("/users/roles")]).then(
			([usersResponse, rolesResponse]) => {
				if (usersResponse.error || rolesResponse.error) {
					setServerError(usersResponse.error || rolesResponse.error);

					return;
				}

				console.log(usersResponse.data);

				setUsers(usersResponse.data);
				setRoles(rolesResponse.data);
			},
		);
	}, [userRole, isAdmin, shouldUpdateUserList]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Пользователи</h2>
				<Table
					users={users}
					roles={roles}
					shouldUpdateUserList={shouldUpdateUserList}
					setShouldUpdateUserList={setShouldUpdateUserList}
				/>
			</div>
		</PrivateContent>
	);
};
