import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import styles from "./Toastify.module.scss";

const rootEl = document.body;

const TOASTIFY_OPTIONS = {
	duration: 3000,
};

export const Toastify = ({ serverError }) => {
	const [showToastify, setShowToastify] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowToastify(false);
		}, TOASTIFY_OPTIONS.duration);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return createPortal(
		<>
			{showToastify && (
				<div
					className={
						serverError && `${styles.toastify} ${styles.error} ${styles.topCenter}`
					}
				>
					<div className={styles.toastify__top}>
						<div className={styles.toastify__left}>
							<span className={styles.toastify__icon}>
								<MdOutlineError className="icon iconToastifyError" />
							</span>
							<span className={styles.toastify__message}>{serverError}</span>
						</div>
						<div className={styles.toastify__right}>
							<button type="button" className={styles.toastify__button}>
								<IoMdClose className="icon iconToastifyClose" />
							</button>
						</div>
					</div>
					<div className={styles.toastify__bottom}>
						<div
							className={styles.toastify__animation}
							// style={{
							// 	animation: `$toastifyAnimate 3s ease-out forwards`,
							// 	// animationName: "$toastifyAnimate",
							// 	// animationDuration: `${TOASTIFY_OPTIONS.duration / 1000}s`,
							// 	// animationFillMode: "forwards",
							// 	// animationTimingFunction: "ease-out",
							// 	"@keyframes toastifyAnimate": {
							// 		"0%": { width: "100%" },
							// 		"100%": { width: "0" },
							// 	},
							// }}
						></div>
					</div>
				</div>
			)}
		</>,
		rootEl,
	);
};
