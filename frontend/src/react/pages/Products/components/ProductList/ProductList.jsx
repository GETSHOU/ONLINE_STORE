import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
	return (
		<ul className={styles.list}>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</ul>
	);
};
