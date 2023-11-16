import { SortingProductList } from "../../components";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import { ProductList } from "./components/ProductList/ProductList";
import styles from "./Products.module.scss";

export const Products = () => {
	return (
		<div className={styles.content}>
			<div className={`${styles.contentInnerWrapper} ${styles.filter}`}>
				<ProductFilter />
			</div>
			<div className={`${styles.contentInnerWrapper} ${styles.content}`}>
				<div className={styles.contentHeader}>
					<SortingProductList />
				</div>
				<div className={styles.contenMain}>
					<ProductList />
				</div>
			</div>
		</div>
	);
};
