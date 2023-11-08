import { Aside } from "./components/Aside/Aside";
import styles from "./AdminPanel.module.scss";

export const AdminPanel = () => {
	return (
		<div className={styles.wrapper}>
			<Aside />
		</div>
	);
};
