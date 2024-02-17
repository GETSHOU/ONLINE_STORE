import styles from "./Form.module.scss";

export const Form = ({ children, onSubmit, formError }) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.formBody}>{children}</div>
			{formError && (
				<div className={styles.formError}>
					<span className="error">{formError}</span>
				</div>
			)}
		</form>
	);
};
