import styles from "./Form.module.scss";

export const Form = ({ children, onSubmit, serverError }) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.formBody}>{children}</div>
			{serverError && (
				<div className={styles.formError}>
					<span className="error">{serverError}</span>
				</div>
			)}
		</form>
	);
};
