import { memo } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import styles from "./Toastify.module.scss";

const rootEl = document.body;

export const Toastify = memo(({ error, success, onClose }) => {
	const handleClose = () => onClose();

	return createPortal(
		<>
			<div
				className={
					error
						? `${styles.toastify} ${styles.error} ${styles.topCenter}`
						: `${styles.toastify} ${styles.success} ${styles.topCenter}`
				}
			>
				<div className={styles.toastify__top}>
					<div className={styles.toastify__left}>
						<span className={styles.toastify__icon}>
							<MdOutlineError className="icon iconToastifyError" />
						</span>
						<span className={styles.toastify__message}>{error || success}</span>
					</div>
					<div className={styles.toastify__right}>
						<button
							type="button"
							className={styles.toastify__button}
							onClick={handleClose}
						>
							<IoMdClose className="icon iconToastifyClose" />
						</button>
					</div>
				</div>
				{/* <div className={styles.toastify__bottom}>
					<div className={styles.toastify__animation}></div>
				</div> */}
			</div>
		</>,
		rootEl,
	);
});
