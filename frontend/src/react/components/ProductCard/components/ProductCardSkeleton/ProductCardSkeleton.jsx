import styles from "../../ProductCard.module.scss";
import { ProductInfoSkeleton } from "../../../ProductInfo/components/ProductInfoSkeleton/ProductInfoSkeleton";
import { ProductActionsSkeleton } from "../../../ProductActions/components/ProductActionsSkeleton/ProductActionsSkeleton";

export const ProductCardSkeleton = ({ products }) => {
	return Array(products)
		.fill(0)
		.map((_, i) => (
			<div key={i} className={styles.card}>
				<div className={styles.card__left}>
					<ProductInfoSkeleton inline={true} />
				</div>
				<div className={styles.card__right}>
					<ProductActionsSkeleton inline={true} />
				</div>
			</div>
		));
};
