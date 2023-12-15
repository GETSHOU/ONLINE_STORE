import styles from "./ModalAuth.module.scss";

export const ModalAuth = ({ children, buttonText, toggleModal }) => {
	return (
		<div className={styles.modalAuth}>
			<div className={styles.modalAuthBody}>{children}</div>
			<div className={styles.modalAuthActions}>
				<button className={styles.modalAuthToggle} type="button" onClick={toggleModal}>
					{buttonText}
				</button>
			</div>
		</div>
	);
};
