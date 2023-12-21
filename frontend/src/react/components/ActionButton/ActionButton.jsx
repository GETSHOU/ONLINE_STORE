import styles from "./ActionButton.module.scss";

export const ActionButton = ({
	icon,
	isDisabled,
	isTableTitle,
	clickFunction,
	...props
}) => {
	return (
		<button
			type="button"
			className={
				!isTableTitle ? `${styles.button}` : `${styles.button} ${styles.buttonTitle}`
			}
			disabled={isDisabled}
			onClick={clickFunction}
			{...props}
		>
			{icon}
		</button>
	);
};
