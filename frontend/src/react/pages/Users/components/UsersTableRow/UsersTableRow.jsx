import { useState } from "react";
import { formatServerDate } from "../../../../../utils";
import { Actions } from "../Actions/Actions";
import { FormSelect } from "../../../../components";
import styles from "./UsersTableRow.module.scss";

export const UsersTableRow = ({ name, email, roles, userId, roleId, registeredAt }) => {
	const [selectedRoleId, setSelectedRoleId] = useState(roleId);

	const roleOnChange = selectedOption => setSelectedRoleId(Number(selectedOption.value));
	const selectedRole = roles.find(role => role.id === selectedRoleId);

	return (
		<div className={styles.row}>
			<div className={styles.row__cell}>{name}</div>
			<div className={styles.row__cell}>{email}</div>
			<div className={styles.row__cell}>{formatServerDate(registeredAt)}</div>
			<div className={styles.row__cell}>
				<FormSelect
					data={roles}
					name="roles"
					onChange={roleOnChange}
					selectedItem={selectedRole}
				/>
			</div>
			<div className={styles.row__cell}>
				<Actions userId={userId} roleId={roleId} selectedRoleId={selectedRoleId} />
			</div>
		</div>
	);
};
