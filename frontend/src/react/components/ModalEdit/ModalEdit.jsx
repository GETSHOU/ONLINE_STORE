import { Button } from "../Button/Button";
import styles from "./ModalEdit.module.scss";

export const ModalEdit = ({ onChange, handleEdit, isDisabled, newValueToUpdate }) => {
	return (
		<div className={styles.modalEdit}>
			<div className={styles.modalEditContent}>
				<input
					className={styles.modalEditInput}
					type="text"
					name="name"
					value={newValueToUpdate}
					onChange={onChange}
				/>
			</div>
			<div className={styles.modalEditActions}>
				<Button
					type="button"
					text="Изменить"
					onClick={handleEdit}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
};
