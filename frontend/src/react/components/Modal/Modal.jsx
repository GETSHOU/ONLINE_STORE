import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { closeModal } from "../../store/actions";
import { modalTypeSelector } from "../../store/selectors";
import { MODAL_TYPES } from "../../../constants";
import styles from "./Modal.module.scss";

export const Modal = ({ children, modalTitle }) => {
	const dispatch = useDispatch();
	const currentModal = useSelector(modalTypeSelector);

	const handleClose = () => dispatch(closeModal());

	return (
		<div className={styles.modal}>
			{currentModal !== MODAL_TYPES.CONFIRM && (
				<header className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>{modalTitle}</h2>
					<button className={styles.modalButton} onClick={handleClose}>
						<IoMdClose className="icon iconClose" />
					</button>
				</header>
			)}
			<main className={styles.modalBody}>{children}</main>
		</div>
	);
};
