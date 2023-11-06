import { Button } from "../../../Button/Button";
import styles from "./ModalForm.module.scss";

export const ModalForm = ({
	children,
	onSubmit,
	buttonText,
	showError,
	serverError,
	emailErrorMessage,
	nameErrorMessage,
	passwordErrorMessage,
	passcheckErrorMessage,
}) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.formBody}>{children}</div>
			<footer className={styles.footer}>
				{showError && (
					<div className={styles.formError}>
						<span className="error">{serverError}</span>
					</div>
				)}
				<Button
					type={"submit"}
					text={buttonText}
					disabled={
						!!emailErrorMessage ||
						!!nameErrorMessage ||
						!!passwordErrorMessage ||
						!!passcheckErrorMessage ||
						!!serverError
					}
				/>
			</footer>
		</form>
	);
};
