import { ROLES } from "../../../../../constants";
import { UsersTableTitles } from "../UsersTableTitles/UsersTableTitles";
import { UsersTableRow } from "../UsersTableRow/UsersTableRow";
import styles from "./UsersTable.module.scss";

export const UsersTable = ({
	users,
	roles,
	dataIsLoaded,
	shouldUpdateUserList,
	setShouldUpdateUserList,
}) => {
	return (
		<div className={styles.tableWrapper}>
			<div className={styles.table}>
				{dataIsLoaded && <UsersTableTitles />}
				{users.map(({ id, roleId, email, name, registeredAt }) => (
					<UsersTableRow
						key={id}
						name={name}
						email={email}
						roles={roles.filter(({ id: roleId }) => roleId !== ROLES.GUEST)}
						userId={id}
						roleId={roleId}
						registeredAt={registeredAt}
						shouldUpdateUserList={shouldUpdateUserList}
						setShouldUpdateUserList={setShouldUpdateUserList}
					/>
				))}
			</div>
		</div>
	);
};
