import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModalInputValue } from "../../store/actions";
import { Button } from "../Button/Button";
import styles from "./ModalEdit.module.scss";

export const ModalEdit = ({
	handleEdit,
	valueToUpdate,
	newValueToUpdate,
	editButtonIsDisabled,
}) => {
	const [isDisabled, setIsDisabled] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (newValueToUpdate === valueToUpdate) {
			setIsDisabled(true);
		}
	}, [newValueToUpdate, valueToUpdate]);

	const onChangeValue = ({ target }) => {
		dispatch(updateModalInputValue(target.value));

		if (target.value.length !== 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}

		if (target.value.trim() === valueToUpdate) {
			setIsDisabled(true);
		}
	};

	return (
		<div className={styles.modalEdit}>
			<div className={styles.modalEditContent}>
				<input
					type="text"
					name="name"
					value={newValueToUpdate}
					onChange={onChangeValue}
					className={styles.modalEditInput}
				/>
			</div>
			<div className={styles.modalEditActions}>
				<Button
					type="button"
					text="Изменить"
					onClick={handleEdit}
					isDisabled={isDisabled || editButtonIsDisabled}
				/>
			</div>
		</div>
	);
};
