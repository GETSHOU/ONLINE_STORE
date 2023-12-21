import { ProductsTable } from "../ProductsTable/ProductsTable";
import styles from "./ProductsList.module.scss";

export const ProductsList = ({ products }) => {
	return (
		<div className={styles.list}>
			{products.map(product => {
				return <ProductsTable key={product.id} product={product} />;
			})}
		</div>
	);
};
