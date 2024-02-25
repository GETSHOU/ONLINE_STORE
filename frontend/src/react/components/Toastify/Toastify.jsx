import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import styles from "./Toastify.module.scss";

const rootEl = document.body;

const TOASTIFY_OPTIONS = {
	duration: 5000,
};

export const Toastify = ({ error, success, action }) => {
	const [timer, setTimer] = useState(null);
	const [visible, setVisible] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimer(
			setTimeout(() => {
				setVisible(false);
				dispatch(action());
			}, TOASTIFY_OPTIONS.duration),
		);
	}, [dispatch, action]);

	const handleClose = () => {
		clearTimeout(timer);
		dispatch(action());
	};

	return createPortal(
		<>
			{visible && (
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
					<div className={styles.toastify__bottom}>
						<div className={styles.toastify__animation}></div>
					</div>
				</div>
			)}
		</>,
		rootEl,
	);
};
