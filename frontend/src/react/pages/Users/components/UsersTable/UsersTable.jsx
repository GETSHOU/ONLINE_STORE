import { ROLES } from "../../../../../constants";
import { UsersTableRow } from "../UsersTableRow/UsersTableRow";
import { UsersTableRowSkeleton } from "../UsersTableRow/components/UsersTableRowSkeleton";
import { UsersTableTitles } from "../UsersTableTitles/UsersTableTitles";
import styles from "./UsersTable.module.scss";

export const UsersTable = ({
	users,
	roles,
	usersServerError,
	rolesServerError,
	usersLoadingStatus,
	rolesLoadingStatus,
}) => {
	return (
		<div className={styles.tableWrapper}>
			<div className={styles.table}>
				<UsersTableTitles />
				{usersLoadingStatus && rolesLoadingStatus ? (
					(!usersServerError || !rolesServerError) && (
						<>
							{users.map(({ id, roleId, email, name, registeredAt }) => (
								<UsersTableRow
									key={id}
									name={name}
									email={email}
									roles={roles.filter(({ id: roleId }) => roleId !== ROLES.GUEST)}
									userId={id}
									roleId={roleId}
									registeredAt={registeredAt}
								/>
							))}
						</>
					)
				) : (
					<UsersTableRowSkeleton
						rows={5}
						inline={true}
						baseColor="#B8B8B8"
						highlightColor="#CDCDCD"
					/>
				)}
			</div>
		</div>
	);
};
