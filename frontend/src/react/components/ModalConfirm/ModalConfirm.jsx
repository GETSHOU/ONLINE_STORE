import { useDispatch } from "react-redux";
import { closeModal } from "../../store/actions";
import { Button } from "../Button/Button";
import styles from "./ModalConfirm.module.scss";

export const ModalConfirm = ({ message, handleApply, confirmButtonIsDisabled }) => {
	const dispatch = useDispatch();

	const handleClose = () => dispatch(closeModal());

	return (
		<div className={styles.modalConfirm}>
			<div className={styles.modalConfirmContent}>{message}</div>
			<div className={styles.modalConfirmActions}>
				<Button
					type="button"
					text="Да"
					onClick={handleApply}
					isDisabled={confirmButtonIsDisabled}
				/>
				<Button type="button" text="Отмена" onClick={handleClose} />
			</div>
		</div>
	);
};
