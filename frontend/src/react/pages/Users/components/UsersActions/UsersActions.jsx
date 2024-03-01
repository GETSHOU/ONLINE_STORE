import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPersonRemove, MdSave } from "react-icons/md";
import { deleteUserAsync, updateUserRoleAsync } from "../../../../store/actions";
import { userRoleSelector } from "../../../../store/selectors";
import { checkAccess } from "../../../../../utils";
import { ROLES } from "../../../../../constants";
import styles from "./UsersActions.module.scss";

export const UsersActions = ({ userId, roleId, selectedRoleId }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [initialRoleId, setInitialRoleId] = useState(roleId);

	const currentRoleId = useSelector(userRoleSelector);
	const isAdmin = checkAccess([ROLES.ADMIN], currentRoleId);

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const dispatch = useDispatch();

	const onRoleSave = (userId, newUserRoleId) => {
		if (!isAdmin) {
			return;
		}

		setIsDisabled(true);

		dispatch(updateUserRoleAsync(userId, newUserRoleId))
			.then(() => setInitialRoleId(newUserRoleId))
			.finally(() => {
				setIsDisabled(false);
			});
	};

	const onUserRemove = userId => {
		if (!isAdmin) {
			return;
		}

		setIsDisabled(true);

		dispatch(deleteUserAsync(userId)).finally(() => {
			setIsDisabled(false);
		});
	};

	return (
		<div className={styles.actions}>
			<button
				className={styles.actionsButton}
				type="button"
				disabled={isSaveButtonDisabled || isDisabled}
				onClick={() => onRoleSave(userId, selectedRoleId)}
			>
				<MdSave className="icon iconAction" />
			</button>
			<button
				className={styles.actionsButton}
				type="button"
				disabled={isDisabled}
				onClick={() => onUserRemove(userId)}
			>
				<MdPersonRemove className="icon iconAction" />
			</button>
		</div>
	);
};
