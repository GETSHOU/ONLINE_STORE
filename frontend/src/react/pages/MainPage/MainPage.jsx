import styles from "./MainPage.module.scss";
import { Products } from "../Products/Products";

export const MainPage = () => {
	return (
		<div className={styles.wrapper}>
			<Products />
		</div>
	);
};
