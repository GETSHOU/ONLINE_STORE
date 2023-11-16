import styles from "./ActionButton.module.scss";

export const ActionButton = ({ icon, clickFunction, isDisabled, ...props }) => {
	return (
		<button
			type="button"
			className={styles.button}
			disabled={isDisabled}
			onClick={clickFunction}
			{...props}
		>
			{icon}
		</button>
	);
};
