import { Button } from "../Button/Button";
import styles from "./ModalEditCategory.module.scss";

export const ModalEditCategory = ({ handleEdit, newTitle, onChange, isDisabled }) => {
	return (
		<div className={styles.modalEdit}>
			<div className={styles.modalEditContent}>
				<input
					className={styles.modalEditInput}
					type="text"
					name="name"
					value={newTitle}
					onChange={onChange}
				/>
			</div>
			<div className={styles.modalEditActions}>
				<Button
					type="button"
					text="Изменить"
					onClick={handleEdit}
					disabled={isDisabled}
				/>
			</div>
		</div>
	);
};
