import { forwardRef } from "react";
import { Button } from "../../../Button/Button";
import styles from "./FormGroup.module.scss";

export const FormGroup = forwardRef(
	(
		{
			onSubmit,
			fieldError,
			buttonText,
			isFormButton,
			checkFieldErrors,
			submitButtonIsDisabled,
			...props
		},
		ref,
	) => {
		return (
			<>
				{!isFormButton ? (
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
							{fieldError && <span className="error">{fieldError}</span>}
						</div>
					</div>
				) : (
					<div className={styles.formGroup}>
						<Button
							type={"submit"}
							text={buttonText}
							onClick={onSubmit && onSubmit}
							isDisabled={checkFieldErrors || submitButtonIsDisabled}
						/>
					</div>
				)}
			</>
		);
	},
);
