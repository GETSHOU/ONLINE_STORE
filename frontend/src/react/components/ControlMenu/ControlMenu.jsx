import { Aside } from "./components/Aside/Aside";
import styles from "./ControlMenu.module.scss";

export const ControlMenu = () => {
	return (
		<div className={styles.wrapper}>
			<Aside />
		</div>
	);
};
