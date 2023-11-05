import { Button } from "../../../Button/Button";
import styles from "./ModalForm.module.scss";

export const ModalForm = ({ children, ...props }) => {
	return (
		<form className={styles.form} onSubmit={props.onSubmit}>
			<div className={styles.formBody}>{children}</div>
			<footer className={styles.footer}>
				<Button type={"submit"} text={props.buttonText} />
			</footer>
		</form>
	);
};
