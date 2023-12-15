import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { closeModal } from "../../store/actions";
import styles from "./Modal.module.scss";

export const Modal = ({ children, modalTitle }) => {
	const dispatch = useDispatch();

	const handleCloseModal = () => dispatch(closeModal());

	return (
		<div className={styles.modal}>
			<header className={styles.modalHeader}>
				<h2 className={styles.modalTitle}>{modalTitle}</h2>
				<button className={styles.modalButton} onClick={handleCloseModal}>
					<IoMdClose className="icon iconClose" />
				</button>
			</header>
			<main className={styles.modalBody}>{children}</main>
		</div>
	);
};
