import { ProductsFilter } from "../ProductsFilter/ProductsFilter";
import styles from "./ProductsContent.module.scss";

export const ProductsContent = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			{/* <div className={`${styles.content} ${styles.filter}`}>
				<ProductsFilter />
			</div> */}
			<div className={styles.content}>{children}</div>
		</div>
	);
};
