import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import { ProductList } from "./components/ProductList/ProductList";
import styles from "./Products.module.scss";

export const Products = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.filter}>
				<ProductFilter />
			</div>
			<div className={styles.content}>
				<ProductList />
			</div>
		</div>
	);
};
