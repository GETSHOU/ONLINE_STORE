import { ProductDetails, ProductInfo } from "../../../../components";
import styles from "./ProductCard.module.scss";

export const ProductCard = () => {
	return (
		<li className={styles.card}>
			<div className={styles.cardInnerWrapper}>
				<ProductInfo />
			</div>
			<div className={`${styles.cardInnerWrapper} ${styles.actions}`}>
				<ProductDetails price={303000} />
			</div>
		</li>
	);
};
