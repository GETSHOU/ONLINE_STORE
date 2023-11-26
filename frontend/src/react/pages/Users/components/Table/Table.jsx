import { ROLES } from "../../../../../constants";
import { TableTitles } from "../TableTitles/TableTitles";
import { TableRow } from "../TableRow/TableRow";
import styles from "./Table.module.scss";

export const Table = ({
	users,
	roles,
	shouldUpdateUserList,
	setShouldUpdateUserList,
}) => {
	return (
		<div className={styles.tableWrapper}>
			<div className={styles.table}>
				<TableTitles />
				{users && (
					<>
						{users.map(({ id, roleId, email, name, registeredAt }) => (
							<TableRow
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
					</>
				)}
			</div>
		</div>
	);
};
