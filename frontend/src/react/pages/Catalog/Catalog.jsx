import { PageTitle } from "../../components";
import { CategoryCards } from "./components/CategoryCards/CategoryCards";
import styles from "./Catalog.module.scss";

export const Catalog = () => {
	return (
		<div className={styles.wrapper}>
			<PageTitle title="Каталог товаров" />
			<CategoryCards />
		</div>
	);
};
