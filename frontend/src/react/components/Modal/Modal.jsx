import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { closeModalForm } from "../../store/actions";
import { formModalIsOpenSelector } from "../../store/selectors";
import styles from "./Modal.module.scss";

export const Modal = ({ children, ...props }) => {
	const isOpen = useSelector(formModalIsOpenSelector);
	const dispatch = useDispatch();

	const closeModal = () => dispatch(closeModalForm());

	return (
		<div className={!isOpen ? styles.overlay : `${styles.overlay} ${styles.active}`}>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h2 className={styles.title}>{props.modalTitle}</h2>
					<button className={styles.closeButton} onClick={closeModal}>
						<IoMdClose className="icon iconClose" />
					</button>
				</header>
				<main className={styles.body}>{children}</main>
				{props && (
					<footer className={styles.footer}>
						<button className={styles.toggle} type="button" onClick={props.toggleModal}>
							{props.buttonText}
						</button>
					</footer>
				)}
			</div>
		</div>
	);
};
