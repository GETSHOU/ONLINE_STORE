import styles from "./Form.module.scss";

export const Form = ({ children, onSubmit, showErrorForm, serverErrorForm }) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.formBody}>{children}</div>
			{showErrorForm && (
				<div className={styles.formError}>
					<span className="error">{serverErrorForm}</span>
				</div>
			)}
		</form>
	);
};
