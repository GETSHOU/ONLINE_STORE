import styles from "./ModalFormField.module.scss";

export const ModalFormField = ({ type, placeholder, autoComplete, error }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input className={styles.input} type={type} autoComplete={autoComplete} />
				<span className={styles.placeholder}>{placeholder}</span>
			</div>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
};
