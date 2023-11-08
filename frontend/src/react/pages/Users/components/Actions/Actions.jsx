import { useState } from "react";
import { useSelector } from "react-redux";
import { MdPersonRemove, MdSave } from "react-icons/md";
import { userRoleSelector } from "../../../../store/selectors";
import { checkAccess, request } from "../../../../../utils";
import { ROLES } from "../../../../../constants";
import styles from "./Actions.module.scss";

export const Actions = ({
	userId,
	roleId,
	selectedRoleId,
	shouldUpdateUserList,
	setShouldUpdateUserList,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(roleId);

	const currentRoleId = useSelector(userRoleSelector);
	const isAdmin = checkAccess([ROLES.ADMIN], currentRoleId);

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const onUserRemove = userId => {
		if (!isAdmin) {
			return;
		}

		request(`/users/${userId}`, "DELETE").then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={styles.actions}>
			<button
				className={styles.actionsButton}
				type="button"
				disabled={isSaveButtonDisabled}
				onClick={() => onRoleSave(userId, selectedRoleId)}
			>
				<MdSave className="icon iconAction" />
			</button>
			<button
				className={styles.actionsButton}
				type="button"
				onClick={() => onUserRemove(userId)}
			>
				<MdPersonRemove className="icon iconAction" />
			</button>
		</div>
	);
};
