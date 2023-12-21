import { useState } from "react";
import { formatServerDate } from "../../../../../utils";
import { Actions } from "../Actions/Actions";
import { FormSelect } from "../../../../components";
import styles from "./UsersTableRow.module.scss";

export const UsersTableRow = ({
	name,
	email,
	roles,
	userId,
	roleId,
	registeredAt,
	shouldUpdateUserList,
	setShouldUpdateUserList,
}) => {
	const [selectedRoleId, setSelectedRoleId] = useState(roleId);

	const roleOnChange = selectedOption => setSelectedRoleId(Number(selectedOption.value));
	const selectedRole = roles.find(role => role.id === selectedRoleId);

	return (
		<div className={styles.tableRow}>
			<div className={styles.tableCell}>{name}</div>
			<div className={styles.tableCell}>{email}</div>
			<div className={styles.tableCell}>{formatServerDate(registeredAt)}</div>
			<div className={styles.tableCell}>
				<FormSelect
					data={roles}
					name="roles"
					onChange={roleOnChange}
					selectedItem={selectedRole}
				/>
			</div>
			<div className={styles.tableCell}>
				<Actions
					userId={userId}
					roleId={roleId}
					selectedRoleId={selectedRoleId}
					shouldUpdateUserList={shouldUpdateUserList}
					setShouldUpdateUserList={setShouldUpdateUserList}
				/>
			</div>
		</div>
	);
};
