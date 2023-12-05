import { SortingProductList } from "../../components";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
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
					<ul className={styles.list}>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</ul>
				</div>
			</div>
		</div>
	);
};
