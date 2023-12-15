import { forwardRef } from "react";
import { Button } from "../../../Button/Button";
import styles from "./FormGroup.module.scss";

export const FormGroup = forwardRef(({ error, isButton, ...props }, ref) => {
	const {
		buttonText,
		serverErrorForm,
		nameErrorMessage,
		emailErrorMessage,
		titleErrorMessage,
		passwordErrorMessage,
		passcheckErrorMessage,
	} = props;

	return (
		<>
			{!isButton ? (
				<div className={styles.formGroup}>
					<div className={styles.formGroupField}>
						<input
							className={styles.formGroupInput}
							id={props.name}
							ref={ref}
							{...props}
						/>
						<label className={styles.formGroupLabel}>{props.labelname}</label>
					</div>
					<div className={styles.formGroupError}>
						{error && <span className="error">{error}</span>}
					</div>
				</div>
			) : (
				<div className={styles.formGroup}>
					<Button
						type={"submit"}
						text={buttonText}
						disabled={
							!!serverErrorForm ||
							!!nameErrorMessage ||
							!!emailErrorMessage ||
							!!titleErrorMessage ||
							!!passwordErrorMessage ||
							!!passcheckErrorMessage
						}
					/>
				</div>
			)}
		</>
	);
});
