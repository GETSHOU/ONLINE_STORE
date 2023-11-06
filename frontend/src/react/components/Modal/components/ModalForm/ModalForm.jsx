import { Button } from "../../../Button/Button";
import styles from "./ModalForm.module.scss";

export const ModalForm = ({ children, buttonText, onSubmit }) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.formBody}>{children}</div>
			<footer className={styles.footer}>
				<Button type={"submit"} text={buttonText} />
			</footer>
		</form>
	);
};
