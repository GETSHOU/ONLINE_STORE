import { CategoryCards } from "./components/CategoryCards/CategoryCards";
import styles from "./Catalog.module.scss";

export const Catalog = () => {
	return (
		<div className={styles.wrapper}>
			<CategoryCards />
		</div>
	);
};
