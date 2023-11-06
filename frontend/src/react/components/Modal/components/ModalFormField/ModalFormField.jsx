import { forwardRef } from "react";
import styles from "./ModalFormField.module.scss";

export const ModalFormField = forwardRef(({ error, ...props }, ref) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input className={styles.input} id={props.name} ref={ref} {...props} />
				<label className={styles.label}>{props.labelname}</label>
			</div>
			<div className={styles.inputError}>
				{error && <span className="error">{error}</span>}
			</div>
		</div>
	);
});
