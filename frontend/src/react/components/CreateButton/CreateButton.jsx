import styles from "./CreateButton.module.scss";

export const CreateButton = ({ icon, handleCreate }) => {
	return (
		<button type="button" className={styles.button} onClick={handleCreate}>
			{icon}
		</button>
	);
};
