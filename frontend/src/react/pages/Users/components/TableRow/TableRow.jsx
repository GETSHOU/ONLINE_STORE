import { useState } from "react";
import { formatServerDate } from "../../../../../utils";
import { Actions } from "../Actions/Actions";
import { FormSelect } from "../FormSelect/FormSelect";
import styles from "./TableRow.module.scss";

export const TableRow = ({
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

	return (
		<div className={styles.tableRow}>
			<div className={styles.tableCell}>{name}</div>
			<div className={styles.tableCell}>{email}</div>
			<div className={styles.tableCell}>{formatServerDate(registeredAt)}</div>
			<div className={styles.tableCell}>
				<FormSelect
					roles={roles}
					roleOnChange={roleOnChange}
					selectedRoleId={selectedRoleId}
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
